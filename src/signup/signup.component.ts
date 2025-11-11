import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, AbstractControl, ReactiveFormsModule, FormGroup, Validators, ValidationErrors, PatternValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-guard/auth.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { DataserviceService } from '../dataservice/dataservice.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbTooltip],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit, AfterContentChecked{

  codes: any = [
    {"CountryCode": "+91"},
    {"CountryCode": "+1"},
    {"CountryCode": "+44"},
    {"CountryCode": "+49"}
  ]

  maxChars: number = 5000;
  currentChars: number = 0;
  passwordVisible: Boolean = false;
  cpasswordVisible: Boolean = false;
  success: Boolean = false;
  loaderVisible: Boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private dataservice: DataserviceService) { }

  SignupFormGroup!: FormGroup;

  ngOnInit(): void {
    this.dataservice.isHomepage = false;
    this.SignupFormGroup = this.fb.group({
      firstname : ['', Validators.required],
      lastname : [''],
      gender : ['Male', Validators.required],
      age : ['', [Validators.required, Validators.pattern("[0-9]{1,2}")]],
      phonenumber : ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      location : ['', Validators.required],
      emailid : ['', [Validators.required, Validators.email, Validators.pattern(/[a-zA-z0-9]+@[a-z]+\.[a-z]{2,}/)]],
      // password : ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9-.\s_]+$/)]],
      password : ['', [this.passwordValidator]],
      confirmpassword : ['', Validators.required],
      presentingillness : ['', [Validators.required, Validators.maxLength(5000), Validators.minLength(10)]],
      medicalhistory : ['']
    }, {
      validator: [this.passwordMatchValidator]
    });
  }

  signup() {
    if(this.SignupFormGroup.invalid) {
      this.SignupFormGroup.markAllAsTouched();
      var popupDiv = document.getElementById("invalidPopup");
      popupDiv?.classList.add("invalidPopup");
      popupDiv!.innerHTML = `<button type="button" id="closebtn" class="closebtn">X</button>&nbsp;&nbsp;&nbsp;Form is not valid for Sign Up`;
      document.getElementById("closebtn")?.setAttribute("ngbTooltip", "Close");
      document.getElementById("closebtn")?.addEventListener('click', this.closeBtn);
      popupDiv!.style.display = "block";
      window.scrollTo(0,0);
      setTimeout(() =>{
          popupDiv!.style.display = "none";
        }, 3000);
      }
    else {
      console.log("obj", this.SignupFormGroup.value);
      this.reset();
      this.loaderVisible=true;
      setTimeout(() => {
        this.success = true;
        this.loaderVisible = false;
      }, 3000);
      this.authService.signupSuccessfulPage(true);

      setTimeout(() => {
        this.success = false;
        this.authService.signupSuccessfulPage(false);
        this.router.navigate(['/login/client']);
      }, 12000);
    }
  }

  closeBtn() {
    var popupDiv = document.getElementById("invalidPopup");
    popupDiv!.innerHTML = "";
    popupDiv?.classList.remove("invalidPopup");
  }

  reset() {
    this.SignupFormGroup.reset();
    this.SignupFormGroup.get('gender')?.setValue('Male');
    window.scrollTo(0,0);
  }

  ngAfterContentChecked(): void {
    this.currentChars = this.SignupFormGroup.get('presentingillness')?.value?.length;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleCPasswordVisibility() {
    this.cpasswordVisible = !this.cpasswordVisible;
  }

  passwordValidator(control: AbstractControl) : ValidationErrors | null {
    var pwd = control.value;
    
    if(pwd == '') {
      return {'req': true}
    }
    else if(!(/[A-Z]/.test(pwd))) {
      return {'nocaps': true}
    }
    else if(!(/[a-z]/.test(pwd))) {
      return {'nosmall': true}
    }
    else if(!(/[^A-Za-z0-9]/.test(pwd))) {
      return {'nospl': true}
    }
    else if(!(/[0-9]/.test(pwd))) {
      return {'nonum': true}
    }
    else {
      return null;
    }
  }
  
  passwordMatchValidator(control: AbstractControl) : ValidationErrors | null {
    var passw = control.get('password')?.value;
    var cpassw  = control.get('confirmpassword')?.value;

    if(cpassw !== passw) {
      return {'matchError': true};
    }
    else {
      return null;
    }
  }
}