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

  data:any={};
  description="";
  editInfo=false;
  editAbout=false;

  updateInfo(){
    const data = {
      id: 1,
      firstName : this.editInfo?(<HTMLInputElement>document.getElementById("firstName")).value:this.data.firstName,
      lastName : this.editInfo?(<HTMLInputElement>document.getElementById("lastName")).value:this.data.lastName,
      job : this.editInfo?(<HTMLInputElement>document.getElementById("job")).value:this.data.job,
      ubication : this.editInfo?(<HTMLInputElement>document.getElementById("ubication")).value:this.data.ubication,
      description: this.editAbout?(<HTMLInputElement>document.getElementById('description')).value:this.data.description,
      profileUrl: this.editInfo?(<HTMLInputElement>document.getElementById('profileUrl')).value:this.data.profileUrl,
      bannerUrl: this.editInfo?(<HTMLInputElement>document.getElementById('bannerUrl')).value:this.data.bannerUrl
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
      this.data = res
      this.description = res.description
      this.data.bannerUrl===""?this.data.bannerUrl="https://images.unsplash.com/photo-1531685250784-7569952593d2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074":this.data.bannerUrl
      this.data.profileUrl===""?this.data.profileUrl="https://cdn-icons-png.flaticon.com/512/848/848006.png?w=826":this.data.profileUrl
    })
  }
}
