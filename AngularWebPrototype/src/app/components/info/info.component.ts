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
  description="";
  editInfo=false;
  editAbout=false;

  updateInfo(){
    const data = {
      id: 1,
      firstName : this.editInfo?(<HTMLInputElement>document.getElementById("firstName")).value:this.firstName,
      lastName : this.editInfo?(<HTMLInputElement>document.getElementById("lastName")).value:this.lastName,
      job : this.editInfo?(<HTMLInputElement>document.getElementById("job")).value:this.job,
      ubication : this.editInfo?(<HTMLInputElement>document.getElementById("ubication")).value:this.ubication,
      description: this.editAbout?(<HTMLInputElement>document.getElementById('description')).value:this.description
    }
    this.editInfo=false;
    this.editAbout=false;
    this.json.updateJson('http://localhost:8080/api/person/update', data).subscribe(res=>{
      this.ngOnInit();
      console.log(res);
      
    })
  }

  ngOnInit(): void {
    this.json.getJson('http://localhost:8080/api/person/1').subscribe((res:any)=>{
      this.firstName = res.firstName
      this.lastName = res.lastName
      this.job = res.job
      this.ubication = res.ubication
      this.description = res.description
    })
  }
}
