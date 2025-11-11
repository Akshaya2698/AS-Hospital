import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import DoctorDetails from '../../public/json/doctors.json';
import ClientDetails from '../../public/json/clientdetails.json';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth-guard/auth.service';
import { FormsModule } from '@angular/forms';
import { NgbCollapse, NgbDropdownModule, NgbModal, NgbModalConfig, NgbModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { DataserviceService } from '../dataservice/dataservice.service';

@Component({
  selector: 'app-doctordashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbCollapse, NgbModule, NgbDropdownModule, NgbTooltip],
  templateUrl: './doctordashboard.component.html',
  styleUrl: './doctordashboard.component.css'
})
export class DoctordashboardComponent implements OnInit {
  
  clients: any;
  clientData: any
  doctorData: any;
  doctorDetails: any;
  isProfile: Boolean = false;
  isEditDetails: Boolean = false;
  index: any;
  editName: any;
  editSpecialization: any;
  editDesignation: any;
  editEmail: any;
  editPhonenumber: any;
  currentClient: any;
  detailsOfClient: any;
  value: string = "Task Status";
  originalClientList: any;

  @ViewChild('cPersonalModal') cPersonalTemplateModal!:TemplateRef<any>;
  @ViewChild('cTaskModal') cTaskTemplateModal!:TemplateRef<any>;

  constructor(private authservice:AuthService, private ngbmodal: NgbModal, private ngbmodalconfig: NgbModalConfig, private dataservice: DataserviceService) { }

  ngOnInit(): void {
    this.dataservice.isHomepage = false;
    this.doctorDetails = DoctorDetails.filter((doctor: any) =>  this.authservice.getUser() == doctor.phonenumber);
    this.index = DoctorDetails.findIndex((doctor: any) => this.authservice.getUser() == doctor.phonenumber);
    this.clients = localStorage.getItem('SubmittedData') || '';
    if(this.clients == '') {
      this.clients = ClientDetails;
    }
    else {
      this.clients = JSON.parse(this.clients);
    }
    console.log("doctorDtails", this.doctorDetails);
    console.log("clients", this.clients);
    
    for(let i=0; i<this.clients.length; i++) {
      if(this.clients[i].isRemainder != '' && this.clients[i].isRemainder != undefined && this.clients[i].isRemainder != null) { }
      else {
        this.clients[i].isRemainder = false;
      }

      if(this.clients[i].dateOfRemainder != '' && this.clients[i].dateOfRemainder != undefined && this.clients[i].dateOfRemainder != null) { }
      else {
        var date = new Date().getDate().toString().padStart(2, '0');
        var month = (new Date().getMonth() + 1).toString().padStart(2, '0');
        var year = new Date().getFullYear();
        this.clients[i].dateOfRemainder = year+'-'+month+'-'+date;
      }
    }

    this.clientData = this.clients.filter((client: any) => client.reportingDoctor == this.doctorDetails[0].name);
    console.log("clientData", this.clientData[0]);

    this.originalClientList = this.clientData;

    this.detailsOfClient = {};
    this.clientData.map((client: any, index: any) => {
      this.detailsOfClient[index] = {
        "isCollapsed": true,
        "isTaskCompleted": client.taskStatus
      }
    });

    console.log("detailsofclient", this.detailsOfClient);

    var pageDetails = localStorage.getItem('savedDoctor') || '';

    if(pageDetails != '' && pageDetails != undefined) {
      var savedDoctorDetails = JSON.parse(pageDetails);
    }

    this.editName = this.doctorDetails[0].name;
    this.editSpecialization = this.doctorDetails[0].specialization;
    this.editDesignation = this.doctorDetails[0].designation;
    this.editEmail = this.doctorDetails[0].email;
    this.editPhonenumber = this.doctorDetails[0].phonenumber;
  }

  profile() {
    this.isProfile = true;
  }

  client() {
    this.isProfile = false;
  }

  editDetails() {
    this.isEditDetails = true;
    window.scrollTo(0,0);
    document.body.classList.add('scroll-lock');
  }

  saveEditDetails() {
    this.isEditDetails = false;
    var allData: any = DoctorDetails;

    allData[this.index].name = this.editName;
    allData[this.index].specialization = this.editSpecialization;
    allData[this.index].designation = this.editDesignation;
    allData[this.index].email = this.editEmail;
    allData[this.index].phonenumber = this.editPhonenumber;
    
    localStorage.setItem('savedDoctor', JSON.stringify(allData));
    document.body.classList.remove('scroll-lock');
  }

  close() {
    this.isEditDetails = false;
    document.body.classList.remove('scroll-lock');
    this.ngbmodal.dismissAll();
  }

  personalDetails(client: any) {
    this.currentClient = client;

    this.ngbmodal.open(this.cPersonalTemplateModal, {
      size: 'lg',
      centered: true
    });
  }

  taskDetails(client: any) {
    this.currentClient = client;

    this.ngbmodal.open(this.cTaskTemplateModal, {
      size: 'lg',
      centered: true
    });
  }

  toggleDetails(index: any) {
    for(let i=0; i< this.clientData.length; i++) {
      if(i == index) {
          this.detailsOfClient[index] = {
            "isCollapsed" : !this.detailsOfClient[index].isCollapsed,
            "isTaskCompleted": this.detailsOfClient[index].isTaskCompleted
          }
      }
    }
  }

  filterBasedOnTaskStatus(taskStatus: any) {
    this.clientData = this.originalClientList;
    if(taskStatus == 'all') {
      this.clientData = this.originalClientList;
      for(let i=0;i<this.clientData.length;i++) {
        this.detailsOfClient[i] = {
          "isCollapsed" : true,
          "isTaskCompleted": this.clientData[i].taskStatus
        }
      }
    }
    else {
      this.clientData = this.clientData.filter((client: any) => client.taskStatus.toString() == taskStatus.toString());

      if(taskStatus != 'true'){
        for(let i=0;i<this.clientData.length;i++) {
          this.detailsOfClient[i] = {
            "isCollapsed" : true,
            "isTaskCompleted": this.clientData[i].taskStatus
          }
        }
      }
      else if(taskStatus == 'true'){
        for(let i=0;i<this.clientData.length;i++) {
          this.detailsOfClient[i] = {
            "isCollapsed" : true,
            "isTaskCompleted": this.clientData[i].taskStatus
          }
        }
      }
    }
  }

  sendRemainder(i: any) {
    var allData = this.clients;
    for(let j=0; j < allData.length; j++) {
      if(this.clientData[i].phonenumber == allData[j].phonenumber) {
        this.clientData[i].isRemainder = true;
        this.clientData[i].dateOfRemainder = this.clientData[i].dateOfRemainder;
      }
    }
    allData = this.clients;
    localStorage.setItem('remainderList', JSON.stringify(allData));
  }
}
