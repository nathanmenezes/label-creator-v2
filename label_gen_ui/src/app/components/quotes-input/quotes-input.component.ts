import {Component, OnInit} from '@angular/core';
import {LabelService} from "../../service/label.service";
import {Html} from "../../model/html";
import {Quotes} from "../../model/quotes";
import {LabelModel} from "../../model/label-model";

@Component({
    selector: 'app-quotes-input',
    templateUrl: './quotes-input.component.html',
    styleUrls: ['./quotes-input.component.scss']
})
export class QuotesInputComponent implements OnInit{
    teste: string = "";
    constructor(private service: LabelService) {
    }

    quotes : Quotes = {
        quotes: [],
        idProject: 1
    };

    approved:string = "";
    reproved:string = "";

    sendQuotes(){
        this.quotes.quotes = this.separateWords(this.quoteInput);
        this.approved = "";
        this.reproved = "";
        this.service.sendLabels(this.quotes).subscribe((resp) =>{
            console.log(resp);
                for (const label of resp.body.approved) {
                    this.approved += label.keyLabel + "\n";
                }
                for (const label of resp.body.reproved) {
                    this.reproved += label.keyLabel + "\n";
                }
        },
            error => {
            console.log(error);
            }
        )
    }

    words: string[] = [];

    html: Html = {
        html: ""
    }

    sendHtml() {
        this.service.sendHtml(this.html).subscribe((resp) => {
                console.log(resp);
            },
            error => {
                console.error(error);
            }
        )
    }
    quoteInput:string = "";

    separateWords(word: String) {
        // Remove espaços em branco antes e depois do texto
        word = word.trim();

        // Verifica se o texto está vazio
        if (word === '') {
            return [];
        }

        // Divide o texto em palavras com base na vírgula como separador
        var palavras = word.split("\n");

        // Remove espaços em branco antes e depois de cada palavra
        palavras = palavras.map(function (palavra) {
            return palavra.trim();
        });

        return palavras;
    }

    ngOnInit(): void {

    }
}
