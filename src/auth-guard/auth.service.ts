import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedin = new BehaviorSubject<boolean>(this.checkloggedinstatus());
  public isloggedin$: Observable<boolean> = this.loggedin.asObservable();

  public signupSuccess = new BehaviorSubject<boolean>(false);
  public signupSuccess$: Observable<boolean> = this.signupSuccess.asObservable();

  user: any;

  constructor() { }

  login(){ 
    localStorage.setItem("isLoggedIn", 'true');
    this.loggedin.next(true);
  }

  logout() {
    localStorage.setItem("isLoggedIn", 'false');
    this.loggedin.next(false);
  }

  checkloggedinstatus() {
    var status = localStorage.getItem("isLoggedIn");
    return status =='true';
  }

  signupSuccessfulPage(status: boolean) {
    this.signupSuccess.next(status);
  }

  setUser(ph: any) {
    this.user = ph;
  }

  getUser() {
    return this.user;
  }
}
