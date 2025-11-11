import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth-guard/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  public isloggedin$!: Observable<boolean>;
  public signupSuccess$!: Observable<boolean>;
  isSignUpHover: Boolean = false;
  isLoginHover: Boolean = false;

  constructor(private router:Router, private authservice: AuthService) { }

  ngOnInit() { 
    this.isloggedin$ = this.authservice.isloggedin$;
    this.signupSuccess$ = this.authservice.signupSuccess$;
    console.log("signup", this.signupSuccess$);
  }

  signup() {
    this.router.navigate(["/signup"]);
  }

  login(person: any='client') {
    this.router.navigate(["/login", person]);
  }

  logout() {
    this.authservice.logout();
    this.router.navigate(["/home"]);
  }

  signUptooltip() {
    this.isSignUpHover = !this.isSignUpHover;
  }

  logintooltip() {
    this.isLoginHover = !this.isLoginHover;
  }
}
