import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JsonService } from '../../json.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(public json:JsonService){ }

  firstName="";
  lastName="";
  job="";
  ubication="";
  edit=false;

  updateInfo(){
    this.edit = false;
    const data = {
      id: 1,
      firstName : (<HTMLInputElement>document.getElementById("firstName")).value,
      lastName : (<HTMLInputElement>document.getElementById("lastName")).value,
      job : (<HTMLInputElement>document.getElementById("job")).value,
      ubication : (<HTMLInputElement>document.getElementById("ubication")).value,
    }
    this.json.postJson('http://localhost:8080/api/person/create', data).subscribe(res=>{
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
    this.json.getJson('http://localhost:8080/api/person/1').subscribe((res:any)=>{
      this.firstName = res.firstName
      this.lastName = res.lastName
      this.job = res.job
      this.ubication = res.ubication
    })
  }
}
