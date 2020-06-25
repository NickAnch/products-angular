import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthResponse, User } from '@models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/';
  public error$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  get token(): string {
    const expiresDate = new Date(localStorage.getItem('angular-app-token-expires'));
    if (new Date() > expiresDate) {
      this.logout();
    } else {
      return localStorage.getItem('angular-app-token');
    }
  }

  private setToken(response: AuthResponse): void {
    const expiresDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
    localStorage.setItem('angular-app-token', response.idToken);
    localStorage.setItem('angular-app-token-expires', expiresDate.toString());
  }

  public login(user: User): Observable<AuthResponse> {
    user.returnSecureToken = true;
    return this.http.post(`${this.url}accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap((response: AuthResponse) => this.setToken(response)),
        catchError((error) => {
          const { message } = error.error.error;
          switch (message) {
            case 'INVALID_PASSWORD':
              this.error$.next('Invalid password...');
              break;
            case 'EMAIL_NOT_FOUND':
              this.error$.next('Email not found...');
              break;
            default:
              this.error$.next('Unknown error, please try again...');
            break;
          }
          return throwError(error);
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('angular-app-token');
    localStorage.removeItem('angular-app-token-expires');
  }

  public isLoggedIn(): boolean {
    return !!this.token;
  }

}
