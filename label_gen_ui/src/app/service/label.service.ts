import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Html} from "../model/html";
import {Quotes} from "../model/quotes";

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  constructor(private http:HttpClient) {}
  private url:string = "http://localhost:8080"

  findAll(): Observable<any>{
    return this.http.get(this.url+ "/label");
  }

    sendHtml(html: Html): Observable<any>{
    return this.http.post(this.url+"/label/replace", html);
  }

  getSql(): Observable<any>{
    return this.http.get("http://localhost:8080/label/sql/1?systemLocaleId=1");
  }

  getProjects(): Observable<any>{
    return this.http.get(this.url + "/project");
  }

  sendLabels(quotes:Quotes): Observable<any>{
    return this.http.post(this.url + "/label", quotes);
  }
}
