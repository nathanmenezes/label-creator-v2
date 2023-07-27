import {Component, OnInit} from '@angular/core';
import {LabelModel} from "../../model/label-model";
import {AppComponent} from "../../app.component";
import {LabelService} from "../../service/label.service";

const labelsSelecionadas: number[] = [];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  displayedColumns: string[] = ['date', 'key', 'value', 'actions'];

  constructor(private http:LabelService) {}
  labelList: LabelModel[] = [];
  hasData = false;

  hasLabelsSelect(): boolean {
    return labelsSelecionadas.length > 0;
  }
  ngOnInit(){
      this.findAll();
  }

  findAll(){
    this.http.findAll(localStorage.getItem("projectId")).subscribe((resp) =>{
        this.labelList = resp;
      },
      error => {
        console.log(error);
      })
  }

  protected readonly console = console;
}
