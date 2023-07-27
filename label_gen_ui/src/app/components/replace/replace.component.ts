import {Component} from '@angular/core';
import {Html} from "../../model/html";
import {LabelService} from "../../service/label.service";
import {ReplaceModel} from "../../model/replace-model";

@Component({
    selector: 'app-replace',
    templateUrl: './replace.component.html',
    styleUrls: ['./replace.component.scss']
})
export class ReplaceComponent {
    constructor(private service: LabelService) {
    }

    words: string[] = [];

    html: Html = {
        html: ""
    }

    result: string = "";
    hasResult: boolean = false;

    sendHtml() {
        this.hasResult = true;
        this.service.sendHtml(this.html).subscribe((resp) => {
                console.log(resp);
                this.result = resp.html;
                this.hasResult = false;
            },
            error => {
                console.error(error);
            }
        )
    }
}
