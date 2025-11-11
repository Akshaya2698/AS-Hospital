import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-guard/auth.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent }from '../forgot-password/forgot-password.component';
import { DataserviceService } from '../dataservice/dataservice.service';
import ClientDetails from '../../public/json/clientdetails.json';
import DoctorDetails from '../../public/json/doctors.json';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  person: any;
  showPassword: Boolean = false;
  generatedCaptcha: any;
  isForgotPswdClicked: Boolean = false;
  toaster: Boolean = false;
  isModalOpen: Boolean = false;
  isCorrectClientPswd!: Boolean;
  isCorrectDoctorPswd!: Boolean;
  isInvalidUsername!: Boolean;

  @ViewChild('captchamodel') captchaModelControl!: NgModel;
  @Input() resetSuccessful: any;
  
  user = {
    username: '',
    password: '',
    captcha: ''
  }

  constructor(private router:Router, private authservice: AuthService, private ngbmodal: NgbModal, private ngbmodalconfig: NgbModalConfig, private dataservice: DataserviceService) { }

  ngOnInit() {
    this.dataservice.isHomepage = false;
    console.log(window.location.href);
    var url = window.location.href;
    this.person = url.split('login/')[1];
    console.log(this.person);
    this.generateCaptcha();

    console.log("input - resetSuccessful", this.resetSuccessful);
  }

  generateCaptcha() {
    console.log("clicked");
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var captcha: any = '';
    for(let i=0; i<=6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.generatedCaptcha = captcha;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submit(person: any = 'client') {
    this.isInvalidUsername = false;
    this.isCorrectClientPswd = false;
    this.isCorrectDoctorPswd = false;
    console.log("Submitted", person);
    this.captchaModelControl.control.markAsTouched();
    if(this.user.captcha == this.generatedCaptcha) {
      this.userValidator(person);
      if(!this.isInvalidUsername) {
        this.pswdValidator(person);
        if(this.isCorrectClientPswd || this.isCorrectDoctorPswd) {
          this.authservice.login();
          if(person == 'doctor') {
            this.authservice.setUser(this.user.username);
            this.router.navigate(['/doctordashboard']);
          }
          else if(person == 'client') {
            this.authservice.setUser(this.user.username);
            this.router.navigate(['/clientdashboard']);
          }
        }
        else {
          alert('Wrong Username / Password');
        }
      }
    }
    else {
      var element = document.getElementById("captcha-wrong");
      var errormsgElement = document.getElementById("captcha-wrong-error-msg");
      element!.style.display = 'block';
      errormsgElement!.innerText = 'You have entered Wrong Captcha';
      
      setTimeout(() => {
        element!.style.display = 'none';
        errormsgElement!.innerText = '';
      }, 2000);
      
      this.generateCaptcha();
    }
  }
   
  forgotpswd(person: any) {
    this.isForgotPswdClicked = true;

    const modalRef = this.ngbmodal.open(ForgotPasswordComponent, {
      size: 'sm',
      centered: true,
    });

    modalRef.componentInstance.person = person;

    modalRef.componentInstance.resetSuccessful.subscribe((result: any) => {
      if(result) {
        this.toaster = true;
        this.isModalOpen = true;

        setTimeout(() => {
          this.toaster = false;
          this.isModalOpen = false;
        }, 5000);
      }
      return this.toaster;
    })
  }

  userValidator(person: any) {
    if(person == 'client') {
      var client = ClientDetails.filter((client: any) => client.phonenumber == this.user.username);
      if(client.length == 0) {
        alert("You are a new user. Please Signup before you try to Login");
        setTimeout(() => {
          this.router.navigate(['/signup']);
        }, 2000);
        this.isInvalidUsername = true;
      }
    }
    else if(person == 'doctor') {
      var doctor = DoctorDetails.filter((doc: any) => doc.phonenumber == this.user.username);
      if(doctor.length == 0) {
        alert("Incorrect Username");
        this.isInvalidUsername = true;
      }
    }
  }

  pswdValidator(person: any) {
    if(person == 'client') {
      var client = ClientDetails.filter((client: any) => client.phonenumber == this.user.username);
      if(this.user.password == client[0].password) {
        this.isCorrectClientPswd = true;
      }
      else {
        this.isCorrectClientPswd = false;
      }
    }
    else if(person == 'doctor') {
      var doctor = DoctorDetails.filter((doc: any) => doc.phonenumber == this.user.username);
      if(this.user.password == doctor[0].password) {
        this.isCorrectDoctorPswd = true;
      }
      else {
        this.isCorrectDoctorPswd = false;
      }
    }
  }
}
