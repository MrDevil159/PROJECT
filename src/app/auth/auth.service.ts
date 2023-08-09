import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private tokenExpirationTimer: any;
  user = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, private router:Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5kN6Z9eH8F2eu1iRzzlvZ-8qYEHZFexQ',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  isAuthenticated() {
    if(this.user) {
        return true;
    } else {
        return false;
    }
  }
  autoLogin() {
    const userData = localStorage.getItem('userData');
    if(!userData) {
        return;
    }
    const user: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData') || '');
    const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
    
    if(loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(()=> {
        this.logout();
    } ,expirationDuration)
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5kN6Z9eH8F2eu1iRzzlvZ-8qYEHZFexQ',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    
    if(this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
    }
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (!err.error || !err.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many attempts, Try later';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found, Please Register';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password, Try Again';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User is disabled, Contact Admin';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
