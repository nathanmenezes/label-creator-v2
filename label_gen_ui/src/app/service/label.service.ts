import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Html} from "../model/html";
import {Quotes} from "../model/quotes";
import {ReplaceModel} from "../model/replace-model";

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  constructor(private http:HttpClient) {}
  private url:string = "http://localhost:8080"

  findAll(projectId: string | null): Observable<any>{
    if(projectId != null){
      return this.http.get(this.url+ "/label/project/" + projectId);
    }
    return this.http.get(`${this.url}/label`)
  }

    sendHtml(html: Html): Observable<any>{
    return this.http.post(this.url+"/label/translate/"+ localStorage.getItem("projectId"), html);
  }

  getSql(): Observable<any>{
    const projectId = localStorage.getItem("projectId");
    return this.http.get(`${this.url}/label/sql/${projectId}?systemLocaleId=1`);
  }

  getProjects(): Observable<any>{
    return this.http.get(this.url + "/project");
  }

  sendLabels(quotes:Quotes): Observable<any>{
    return this.http.post(this.url + "/label", quotes);
  }

}
