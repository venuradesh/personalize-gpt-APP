import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environments } from "../../environments/environments";
import User from "../Models/user_model";

@Injectable({
  providedIn: "root",
})
export class UserServiceService {
  private readonly API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environments.apiUrl;
  }

  user_signup(userData: User, choosed_llm: string): Observable<any> {
    return this.httpClient.post(
      `${this.API_URL}/signup`,
      {
        first_name: userData.first_name,
        last_name: userData.last_name,
        date_of_birth: userData.dob,
        organization_name: userData.org_name,
        email: userData.email,
        description: userData.description,
        personality: userData.personality,
        choosed_llm: choosed_llm,
        password: userData.password,
        openai_api_key: choosed_llm === "openai" ? userData.openai_key : "",
      },
      {
        observe: "response",
        withCredentials: true,
      }
    );
  }

  user_login(email: string, password: string): Observable<any> {
    return this.httpClient.post(
      `${this.API_URL}/login`,
      {
        email,
        password,
      },
      {
        observe: "response",
        withCredentials: true,
      }
    );
  }
}
