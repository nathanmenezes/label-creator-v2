import { Component } from '@angular/core';
import {Html} from "../../model/html";

@Component({
  selector: 'app-replace',
  templateUrl: './replace.component.html',
  styleUrls: ['./replace.component.scss']
})
export class ReplaceComponent {
  words: string[] = [];

  html: Html = {
    html: ""
  }

  result: string = "";

  // sendHtml() {
  //   this.service.sendHtml(this.html).subscribe((resp) => {
  //         console.log(resp);
  //         this.result = resp.html;
  //       },
  //       error => {
  //         console.error(error);
  //       }
  //   )
  // }
}
