import {Component, OnInit} from '@angular/core';
import {Project} from "../../models/project";
import {LabelService} from "../../service/label.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  constructor(private service: LabelService) {
  }

  projects: Project[] = [];

  selectedProject!: any;

  teste(selectedValue: any) {
    const selectedProject = this.projects.find(project => project.id === selectedValue);
    if(selectedProject){
      console.log("Projeto selecionado:", selectedProject.name);
    }
  }
  selectProject(id: number){
    this.selectedProject = id;
    console.log("id selecionado" + id);
  }
  getProjects(){
    this.service.getProjects().subscribe((resp) =>{
      this.projects = resp;
    },
        error => {
      console.log(error);
        })
  }

  ngOnInit() {
    this.getProjects();
  }

  protected readonly console = console;
}
