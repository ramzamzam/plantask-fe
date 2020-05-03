import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthenticatedUserDTO, UserRegisterDTO, UserSafeAttributes } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: Implement logic for refreshing tokens
  // TODO: Check if tokens are not expired on page refreshing
  // private refreshTokensInteval;
  private currentUserSubject: BehaviorSubject<AuthenticatedUserDTO>;
  public currentUser: Observable<AuthenticatedUserDTO>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email, password) {
    return this.http.post<AuthenticatedUserDTO>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(map(userDTO => {
        localStorage.setItem('currentUser', JSON.stringify(userDTO));
        console.log(this.jwtDecode(userDTO.accessToken));
        this.currentUserSubject.next(userDTO);
        return userDTO;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(data: UserRegisterDTO) {
    return this.http.post<UserSafeAttributes>(`${environment.apiUrl}/user`, data)
      .toPromise();
  }

  jwtDecode(t) {
    const token = {
      raw: t,
      header: JSON.parse(window.atob(t.split('.')[0])),
      payload:
        JSON.parse(window.atob(t.split('.')[1])),
    };
    return (token);
  }
}
