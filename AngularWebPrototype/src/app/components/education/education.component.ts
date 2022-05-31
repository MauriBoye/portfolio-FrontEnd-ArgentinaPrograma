import { Component, OnInit } from '@angular/core';
import { JsonService } from '../../_services/json.service';
import { StorageService } from '../../_services/storage.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  drop(event: CdkDragDrop<{}>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }
  
  data: any  = [];
  add=false;
  edit=false;
  idEdit=0;
  isLoggedIn = false;
  username?: string;
  
  updateEducation(){
    const body = {
      id: this.idEdit,
      institute: (<HTMLInputElement>document.getElementById("institute")).value,
      career: (<HTMLInputElement>document.getElementById("career")).value,
      entryDate: (<HTMLInputElement>document.getElementById("entryDate")).value,
      exitDate: (<HTMLInputElement>document.getElementById("exitDate")).value,
      description: (<HTMLInputElement>document.getElementById("description")).value,
      logoUrl: (<HTMLInputElement>document.getElementById("logoUrl")).value===""?"https://dummyimage.com/400x400/6e6e6e/ffffff.jpg&text=+LOGO":(<HTMLInputElement>document.getElementById("logoUrl")).value
      ,
      person: {
          id: 1
      }
  }
    this.edit=false;
    this.json.updateJson('http://localhost:8080/api/education/update', body).subscribe(res=>{
      this.ngOnInit();
    })
  }
  addEducation(){
    const body = {
      institute: (<HTMLInputElement>document.getElementById("institute")).value,
      career: (<HTMLInputElement>document.getElementById("career")).value,
      entryDate: (<HTMLInputElement>document.getElementById("entryDate")).value,
      exitDate: (<HTMLInputElement>document.getElementById("exitDate")).value,
      description: (<HTMLInputElement>document.getElementById("description")).value,
      logoUrl: (<HTMLInputElement>document.getElementById("logoUrl")).value===""?"https://dummyimage.com/400x400/6e6e6e/ffffff.jpg&text=+LOGO":(<HTMLInputElement>document.getElementById("logoUrl")).value,
      person: {
          id: 1
      }
  }
    this.add=false;
    this.json.postJson('http://localhost:8080/api/education/create', body).subscribe(res=>{
      this.ngOnInit();
    })
  }
  deleteEducation(id:any){
    this.json.deleteJson('http://localhost:8080/api/education/delete/' + id).subscribe(res=>{
      this.ngOnInit();
    })
  }
  
  constructor(public json:JsonService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.json.getJson('http://localhost:8080/api/education/list').subscribe((res:any)=>{
      this.data = res
    }) 
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
    } 
  }
}
