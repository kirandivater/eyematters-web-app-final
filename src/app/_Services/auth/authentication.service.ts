import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegLogin } from 'src/app/_Models/reg-login';
import { Methods } from 'src/app/_Models/methods';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<RegLogin>;
    public currentUser: Observable<RegLogin>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<RegLogin>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): RegLogin {
        return this.currentUserSubject.value;
    }

    login(users: RegLogin) {
        //let username = users.UserId;
        //let password = users.Password;

        // return this.http.post<User>(ApiUrl.WebApiUrl + Methods.LoginStatusDetails, { username, password })
        return this.http.post<RegLogin>(environment.GlobalApi + Methods.LoginStatus, users)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
