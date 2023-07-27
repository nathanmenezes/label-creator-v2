package br.com.omotor.labelcreatorproject.service;

import br.com.omotor.labelcreatorproject.feign.LabelClient;
import br.com.omotor.labelcreatorproject.model.*;
import br.com.omotor.labelcreatorproject.model.dto.*;
import br.com.omotor.labelcreatorproject.repository.ProjectRepository;
import br.com.omotor.labelcreatorproject.repository.SystemTranslateRepository;
import jakarta.transaction.Transactional;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LabelService {

    @Autowired
    private SystemTranslateRepository repository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    LabelClient labelClient;

    @Transactional
    public ResponseEntity<ReturnMessage> createLabel(Quotes quotesList) {
        RestTemplate template = new RestTemplate();
        List<SystemTranslate> approvedLabels = new ArrayList<>();
        List<SystemTranslate> reprovedLabels = new ArrayList<>();
        Project project = projectRepository.findById(quotesList.getIdProject()).get();
        HashMap<String, String> labels = labelClient.fetchLabels(URI.create(project.getDevUrl()));
        quotesList.getQuotes().forEach(quote -> {
            quote = quote.trim();
            String url = "https://api.mymemory.translated.net/get?q=" + quote + "&langpair=pt|en";
            Matches matches = template.getForObject(url, Matches.class);
            assert matches != null;
            String translation = matches.getMatches().get(0).getTranslation();
            String labelNick = "label_" + translation.replace(" ", "_").toLowerCase();
            SystemTranslate systemTranslatePt = new SystemTranslate(labelNick, quote, 1, project);
            SystemTranslate systemTranslateEn = new SystemTranslate(labelNick, translation, 2, project);
            if (repository.existsByValueAndKeyLabelAndProjectId(systemTranslatePt.getValue(), systemTranslatePt.getKeyLabel(), systemTranslatePt.getProject().getId())) {
                reprovedLabels.add(systemTranslatePt);
            } else if (labels.containsKey(systemTranslatePt.getKeyLabel()) && labels.containsValue(systemTranslatePt.getValue())) {
                reprovedLabels.add(systemTranslatePt);
            } else {
                repository.save(systemTranslatePt);
                repository.save(systemTranslateEn);
                approvedLabels.add(systemTranslatePt);
            }
        });
        return ResponseEntity.status(200).body(new ReturnMessage("Labels cadastrada com sucesso!", new LabelResults(approvedLabels, reprovedLabels)));
    }

    public ResponseEntity<List<SystemTranslateDto>> findAllLabels() {
        return ResponseEntity.status(200).body(repository.findAll().stream().map(SystemTranslateDto::new).toList());
    }

    public ResponseEntity<ReturnMessage> deleteLabel(Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.status(404).body(new ReturnMessage("Label Não Existe no Sistema!", null));
        }
        repository.deleteById(id);
        return ResponseEntity.status(200).body(new ReturnMessage("Label Deletada com sucesso!", id));
    }

    public ResponseEntity<?> findOneLabel(Long id) {
        return ResponseEntity.status(200).body(repository.findById(id).get());
    }

    public ResponseEntity<ReturnMessage> editLabel(Long id, LabelDto labelDto) {
        if (!repository.existsById(id)) {
            return ResponseEntity.status(404).body(new ReturnMessage("Label Não Existe no Sistema!", null));
        }
        SystemTranslate label = repository.findById(id).get();
        label.edit(labelDto);
        repository.save(label);

        return ResponseEntity.status(200).body(new ReturnMessage("Label Alterada com Sucesso!", label));
    }

    public ResponseEntity<?> searchLabel(String value) {
        return ResponseEntity.status(200).body(repository.findByValueContainingOrKeyLabelContaining(value, value));
    }

    public ResponseEntity<Html> replaceLabel(Html html, Long projectId) {
        List<SystemTranslate> labels = repository.findAllBySystemLocaleId(1L);
        String translatedHtml = html.getHtml();
        HashMap<String, String> devLabels = labelClient.fetchLabels(URI.create(projectRepository.findById(projectId).get().getDevUrl()));
        for (SystemTranslate label : labels) {
                String labelToTranslate = label.getValue();
                String translatedLabel = "{{'" + label.getKeyLabel() + "' | translate}}";
                translatedHtml = translatedHtml.replaceAll(labelToTranslate, translatedLabel);
        }
        for (Map.Entry<String, String> entry : devLabels.entrySet()) {
            String translatedLabel = "{{'" + entry.getKey() + "' | translate}}";
            translatedHtml = translatedHtml.replaceAll(entry.getValue(), translatedLabel);
        }
        html.setHtml(translatedHtml);
        return ResponseEntity.status(200).body(html);
    }

    public Set<String> extractTextWithJsoup(String html) {
        Document doc = Jsoup.parse(html);
        Elements elements = doc.getAllElements();
        Set<String> htmlTexts = new HashSet<>();
        elements.forEach(element -> {
            htmlTexts.add(element.ownText());
        });
        return htmlTexts.stream().filter(element -> !element.contains("{") && !element.contains("}") && !element.isEmpty()).collect(Collectors.toSet());
    }

    public ResponseEntity<Html> htmlTranslator(Html html, Long projectId){
        this.createLabel(new Quotes(extractTextWithJsoup(html.getHtml()).stream().toList(), projectId));
        return this.replaceLabel(html, projectId);
    }

    public ResponseEntity<List<SystemTranslateDto>> searchLabelProject(Long id) {
        return ResponseEntity.status(200).body(repository.findAllByProjectId(id).stream().map(SystemTranslateDto::new).toList());
    }

    public ResponseEntity<ReturnMessage> generateSql(Long projectId, Integer systemLocaleId) {
        Project project = projectRepository.findById(projectId).get();
        HashMap<String, String> labels = labelClient.fetchLabels(URI.create(project.getDevUrl()));

        List<SystemTranslate> labelList = repository.findAllByProjectIdAndSystemLocaleId(projectId, systemLocaleId);

        StringBuilder sqlCommand = new StringBuilder("INSERT INTO `" + project.getDataBaseName() + "`.`system_translate` (`created_at`, `key`, `value`, `system_locale_id`) VALUES \n");

        for (SystemTranslate label : labelList) {
            if (!labels.containsKey(label.getKeyLabel()) && !labels.containsValue(label.getValue())) {
                sqlCommand.append("(now(), ").append("'").append(label.getKeyLabel()).append("'").append(", ").append("'").append(label.getValue()).append("'").append(", '").append(label.getSystemLocaleId()).append("'),\n");
            }
        }
        sqlCommand.deleteCharAt(sqlCommand.lastIndexOf(","));
        sqlCommand.deleteCharAt(sqlCommand.lastIndexOf("\n"));
        sqlCommand.append(";");
        return ResponseEntity.status(200).body(new ReturnMessage("SQL Gerado com Sucesso!", sqlCommand));
    }
}
