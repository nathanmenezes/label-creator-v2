import { Component } from '@angular/core';
import {LabelService} from "../../service/label.service";
import {NavComponent} from "../nav/nav.component";

@Component({
  selector: 'app-sqlgenerator',
  templateUrl: './sqlgenerator.component.html',
  styleUrls: ['./sqlgenerator.component.scss']
})
export class SqlgeneratorComponent {
  constructor(private labelService: LabelService) {
  }

  sqlResponse: string = '';

  getSql(){
    this.labelService.getSql().subscribe((resp) =>{
          this.sqlResponse = resp.body;
          console.log(resp);
        },
        error => {
          console.error(error);
        }
    )
  }
}
