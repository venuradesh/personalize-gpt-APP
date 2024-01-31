import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environments } from "../../environments/environments";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private readonly API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environments.apiUrl;
  }

  generateGreeting(user_id: any): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/get-greetings`, {
      params: new HttpParams().set("user_id", user_id),
    });
  }

  generateChatResponse(user_id: any, message: string, chat_history: Array<{ role: string; content: string }>): Observable<any> {
    return this.httpClient.post(
      `${this.API_URL}/query`,
      {
        user_id: user_id,
        message: message,
        chat_history: chat_history,
      },
      {
        observe: "response",
        withCredentials: true,
      }
    );
  }
}
