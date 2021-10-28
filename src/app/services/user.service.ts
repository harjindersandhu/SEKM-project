import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private url: string = 'http://localhost:8000/user';
  //private signup: string = 'http://localhost:8000/signup';
  private url: string = 'https://ecb7-83-211-235-194.ngrok.io/user';
  private signup: string = 'https://ecb7-83-211-235-194.ngrok.io/signup';

  constructor(@Inject(HttpClient) protected http: HttpClient) { }

  // send a GET request to the API to retrieve requested user
  public getUserByID(userID): Observable<User> {
    return this.http.get<User>(this.url + "/" + userID);
  }

  // send a POST request to the API to create a new data object
  public createUser(user): Observable<User> {
    const body = JSON.stringify(user);
    return this.http.post<User>(this.signup, body, httpOptions);
  }

  // send a PUT request to the API to update a data object
  public updateUser(user): Observable<User> {
    const body = JSON.stringify(user);
    return this.http.put<User>(this.url + '/' + user.id, body, httpOptions);
  }

  // send a DELETE request to the API to delete a data object
  public deleteUser(userId): Observable<User> {
    return this.http.delete<User>(this.url + '/' + userId);
  }
}
