import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import ClientDetails from '../../public/json/clientdetails.json';
import DoctorDetails from '../../public/json/doctors.json';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{

  pwdreset: Boolean = false;
  uname: any;
  newpwd: any;
  cnewpwd: any;
  isSuccess: Boolean = false;
  showPassword: Boolean = false;
  cshowPassword: Boolean = false;
  client!: any;
  @Input() person: any;

  @Output() resetSuccessful = new EventEmitter<boolean>();
  @ViewChild('newpassword') newpwdControl !: NgModel;
  @ViewChild('confirmpassword') cnewpwdControl !: NgModel;

  constructor(private ngbactivemodal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log("person - ", this.person);
  }

  page2(isUserNameValid: any) {
    if(this.uname != '' && isUserNameValid) {
      if(this.person == 'client') {
        var client = ClientDetails.filter((c: any) => c.phonenumber == this.uname);
        if(client.length == 0) {
          alert('Are You A New User? If Yes, Please SignUp Before You Try To Login');
        }
        else {
          this.pwdreset = true;
          this.newpwd = '';
          this.cnewpwd = '';
        }
      }
      else if(this.person == 'doctor') {
        var doctor = DoctorDetails.filter((d: any) => d.phonenumber == this.uname);
        if(doctor.length == 0) {
          alert('Invalid UserName. Please Check');
        }
        else {
          this.pwdreset = true;
          this.newpwd = '';
          this.cnewpwd = '';
        }
      }
    }
  }

  close() {
    this.pwdreset = false;
    this.isSuccess = false;
    this.ngbactivemodal.close();

  }

  pswdReset(newpwd: any, cnewpwd: any) {
    if(newpwd && cnewpwd) {
      this.isSuccess = true;
      this.close();
      this.resetSuccessful.emit(true);
    }
    else {
      this.newpwdControl.control.markAsTouched();
      this.cnewpwdControl.control.markAsTouched();
    }
  }

  back() {
    this.pwdreset = false;
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.cshowPassword = !this.cshowPassword;
  }

}
