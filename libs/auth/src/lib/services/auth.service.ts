import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

export interface IUsersResopnse {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  thumbnailUrl: string;
}

export interface IPhotosResponse {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) {}

  public signUp(user: IUser): Observable<object> {
    return this.http
      .get<IPhotosResponse>(`${this.baseUrl}/photos/${user.lastName.length}`)
      .pipe(
        switchMap(({ thumbnailUrl }) => {
          return this.http.post<IUsersResopnse>(`${this.baseUrl}/users`, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            thumbnailUrl,
          });
        })
      );
  }
}
