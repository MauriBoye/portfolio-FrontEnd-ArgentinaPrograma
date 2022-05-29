import { Component, OnInit } from '@angular/core';
import { JsonService } from '../../json.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  data: any  = [];
  add=false;
  edit=false;
  idEdit=0;

  updateLanguage(){
    const body = {
      id: this.idEdit,
      type: (<HTMLInputElement>document.getElementById("language")).value,
      description: (<HTMLInputElement>document.getElementById("description")).value,
      person: {
          id: 1
      }
  }
    this.edit=false;
    this.json.updateJson('http://localhost:8080/api/language/update', body).subscribe(res=>{
      this.ngOnInit();
    })
  }
  addLanguage(){
    const body = {
      type: (<HTMLInputElement>document.getElementById("language")).value,
      description: (<HTMLInputElement>document.getElementById("description")).value,
      person: {
          id: 1
      }
  }
    this.add=false;
    this.json.postJson('http://localhost:8080/api/language/create', body).subscribe(res=>{
      this.ngOnInit();
    })
  }
  deleteLanguage(id:any){
    this.json.deleteJson('http://localhost:8080/api/language/delete/' + id).subscribe(res=>{
      this.ngOnInit();
    })
  }
  
  constructor(public json:JsonService) { }

  ngOnInit(): void {
    this.json.getJson('http://localhost:8080/api/language/list').subscribe((res:any)=>{
      this.data = res
      console.log(res);
      
    })  
  }
}
