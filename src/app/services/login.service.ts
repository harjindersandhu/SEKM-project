import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(@Inject(HttpClient) protected http: HttpClient) { }

  //private url: string = 'http://localhost:8000/login';
  private url: string = 'https://ecb7-83-211-235-194.ngrok.io/login';

  // send a POST request to the API with LOGIN Credentials
  public login(credentials): Observable<any>{
    const body = JSON.stringify(credentials);
    return this.http.post<any>(this.url, body, httpOptions);
  }
}
