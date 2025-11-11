import { Component, OnInit } from '@angular/core';
import ClientDetails from '../../public/json/clientdetails.json'
import { AuthService } from '../auth-guard/auth.service';
import { CommonModule } from '@angular/common';
import { NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import DoctorDetails from '../../public/json/doctors.json';
import { DataserviceService } from '../dataservice/dataservice.service';

@Component({
  selector: 'app-clientdashboard',
  standalone: true,
  imports: [CommonModule, NgbModule, NgbDatepicker, FormsModule],
  templateUrl: './clientdashboard.component.html',
  styleUrl: './clientdashboard.component.css'
})
export class ClientdashboardComponent implements OnInit{

  clientDetails: any;
  doctorDetails: any;
  isDatePickerClicked: Boolean = false;
  selectedDate: string = '';
  today: any;
  dateToday: any;
  isTaskCompleted: Boolean = false;
  isContent: Boolean = false;
  taskContent: any;
  taskStatus: any;
  savefilleddetails: any;
  prefillSaved: any;
  index: any;
  submitted: Boolean = false;
  isEditDetails: Boolean = false;
  editFirstName: any;
  editLastName: any;
  editAge: any;
  editNumber: any;
  editEmail: any;
  editGender: any;
  editLocation: any;
  remainderList: any;

  constructor(private authservice: AuthService, private dataservice: DataserviceService) { }

  ngOnInit(): void {
    this.dataservice.isHomepage = false;
    this.clientDetails = ClientDetails.filter((client: any) => this.authservice.getUser() == client.phonenumber);
    this.index = ClientDetails.findIndex((client: any) => this.authservice.getUser() == client.phonenumber);
    this.doctorDetails = DoctorDetails.filter((doctor: any) => this.clientDetails[0].reportingDoctor == doctor.name);

    console.log("this.clientDetails", this.clientDetails);
    console.log("index", this.index);
    console.log("this.doctorDetails", this.doctorDetails);

    this.today = new Date();

    const year = this.today.getFullYear();
    const month = (this.today.getMonth() + 1).toString().padStart(2, '0');  //+1 -> as month will start from 0
    const date = this.today.getDate().toString().padStart(2, '0');

    this.selectedDate = year+'-'+month+'-'+date;
    this.dateToday = year+'-'+month+'-'+date;

    var pageDetails = localStorage.getItem('saved') || '';
    console.log('pageDetails', pageDetails);

    if(pageDetails != '' && pageDetails != undefined) {
      var savedContents = JSON.parse(pageDetails);

      this.prefillSaved = savedContents.filter((saved: any) => saved.phonenumber == this.clientDetails[0].phonenumber);
      this.taskContent = this.prefillSaved[0]?.taskContent;
      this.taskStatus = this.prefillSaved[0]?.taskStatus;

      console.log("saved content-", this.taskContent);
      console.log("saved checkbox-", this.taskStatus);

      if(this.taskStatus) {
        this.isTaskCompleted = true;
      }

      if(this.taskContent != null && this.taskContent != "" && this.taskContent != undefined) {
        this.isContent = true;
      }
    }

    var sub = localStorage.getItem('SubmittedData') || '';

    if(sub != '' && sub != undefined) {
      var data = JSON.parse(sub);
      if(data[this.index].taskContent.includes(this.dateToday)) {
        this.submitted = true;
      }
      else {
        this.submitted = false;
      }
    }

    this.editFirstName = this.clientDetails[0].name;
    this.editLastName = this.clientDetails[0].lastname;
    this.editAge = this.clientDetails[0].age;
    this.editGender = this.clientDetails[0].gender;
    this.editLocation = this.clientDetails[0].location;
    this.editNumber = this.clientDetails[0].phonenumber;
    this.editEmail = this.clientDetails[0].email;

    var remainder= localStorage.getItem('remainderList') || '';

    if(remainder != '' && remainder != undefined && remainder !=null) {
      this.remainderList = JSON.parse(remainder);

      for(let i=0; i< this.remainderList.length; i++) {
        if(this.remainderList[i].phonenumber == this.clientDetails[0].phonenumber && this.remainderList[i].isRemainder && this.remainderList[i].dateOfRemainder == this.dateToday) {
          this.clientDetails[0].remainder = true;
        }
      }
    }
  }

  datePicker() {
    this.isDatePickerClicked = true;
    window.scrollTo(0,0);
    document.body.classList.add('scroll-lock');
  }

  editDetails() {
    this.isEditDetails = true;
    window.scrollTo(0,0);
    document.body.classList.add('scroll-lock');
  }

  close() {
    this.isDatePickerClicked = false;
    this.isEditDetails = false;
    document.body.classList.remove('scroll-lock');
  }

  sendRequestMail(newDate: any) {
    var nextreview = this.clientDetails[0].nextReview.split('-');
    var date = nextreview[0].padStart(2, '0');
    var month = (new Date(this.clientDetails[0].nextReview).getMonth() + 1).toString().padStart(2, '0');
    var year = nextreview[2];

    nextreview = year+'-'+month+'-'+date;

    var element = document.createElement('a');
    element.href = `mailto:`+this.doctorDetails[0].email+
    `?subject=Request For Change of Next Review Date&body=Hi Dr. `+this.clientDetails[0].reportingDoctor+`,`+
    `%0D%0D     I would like to change my next review date from `+ nextreview +` to `+this.selectedDate+`.`+
    `%0D%0DThanking You,%0D`+this.clientDetails[0].name;
    element.click();
  }

  isContentUpdated() {
    if(this.taskContent == null || this.taskContent == '' || this.taskContent == undefined) {
      document.getElementById('errormsg')!.style.display = 'block';
      this.isContent = false;
      this.isTaskCompleted = false;
      this.taskStatus='';
    }
    else {
      document.getElementById('errormsg')!.style.display = 'none';
      this.isContent = true;
    }
  }

  isTaskCompletedCheckbox() {
    this.isTaskCompleted = !this.isTaskCompleted;
  }

  resetTaskStatus() {
    this.taskContent = '';
    this.taskStatus = '';
    this.isTaskCompleted = false;
    this.isContent = false;
    this.saveDetails();
  }

  saveDetails() {
    var allData: any = ClientDetails;

    allData[this.index].taskContent = this.taskContent;
    allData[this.index].taskStatus = this.taskStatus;

    localStorage.setItem('saved', JSON.stringify(allData));
  }

  submitDetails() {
    this.submitted = true;

    var allData: any = ClientDetails;
    allData[this.index].taskContent += this.dateToday + ' - ' + this.taskContent;
    allData[this.index].taskStatus = this.taskStatus;

    localStorage.setItem('SubmittedData', JSON.stringify(allData));
    console.log("allData", allData);

    var allclientdata: any = ClientDetails;
    for(let j=0; j < allclientdata.length; j++) {
      if(this.clientDetails[0].phonenumber == allclientdata[j].phonenumber) {
        allclientdata[j].isRemainder = false;
        allclientdata[j].remainder = false;
        allclientdata[j].dateOfRemainder = this.remainderList[j].dateOfRemainder;
      }
      else {
        allclientdata[j].isRemainder = this.remainderList[j].isRemainder;
        allclientdata[j].remainder = this.remainderList[j].remainder;
        allclientdata[j].dateOfRemainder = this.remainderList[j].dateOfRemainder;
      }
    }
    var allClientData = allclientdata;
    localStorage.setItem('remainderList', JSON.stringify(allClientData));
  }

  saveEditDetails() {
    this.isEditDetails = false;

    var allData: any = ClientDetails;

    allData[this.index].name = this.editFirstName;
    allData[this.index].lastname = this.editLastName;
    allData[this.index].age = this.editAge;
    allData[this.index].gender = this.editGender;
    allData[this.index].location = this.editLocation;
    allData[this.index].phonenumber = this.editNumber;
    allData[this.index].email = this.editEmail;
    
    localStorage.setItem('saved', JSON.stringify(allData));
    document.body.classList.remove('scroll-lock');
  }
}
