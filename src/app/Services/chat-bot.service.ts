import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environments } from "../../environments/environments";

@Injectable({
  providedIn: "root",
})
export class ChatBotService {
  private readonly API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environments.apiUrl;
  }

  load_doc(file: any, file_name: any): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file_name);
    return this.httpClient.post(`${this.API_URL}/analyze-doc`, formData, {
      observe: "response",
      withCredentials: true,
    });
  }

  getResponseFromBot(query: string, file_name: any): Observable<any> {
    return this.httpClient.post(
      `${this.API_URL}/doc-query`,
      {
        file_name: file_name,
        query: query,
      },
      {
        observe: "response",
        withCredentials: true,
      }
    );
  }
}
