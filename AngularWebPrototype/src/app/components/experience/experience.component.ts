import { Component, OnInit } from '@angular/core';
import { JsonService } from '../../_services/json.service';
import { StorageService } from '../../_services/storage.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  drop(event: CdkDragDrop<{}>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  data: any  = [];
  add=false;
  edit=false;
  idEdit=0;
  isLoggedIn = false;
  username?: string;

  updateExperience(){
    const body = {
      id: this.idEdit,
      title: (<HTMLInputElement>document.getElementById("title")).value,
      company: (<HTMLInputElement>document.getElementById("company")).value,
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
    this.json.updateJson('https://portfolio-mb-arg-programa.herokuapp.com/api/experience/update', body).subscribe(res=>{
      this.ngOnInit();
    })
  }
  addExperience(){
    const body = {
      title: (<HTMLInputElement>document.getElementById("title")).value,
      company: (<HTMLInputElement>document.getElementById("company")).value,
      entryDate: (<HTMLInputElement>document.getElementById("entryDate")).value,
      exitDate: (<HTMLInputElement>document.getElementById("exitDate")).value,
      description: (<HTMLInputElement>document.getElementById("description")).value,
      logoUrl: (<HTMLInputElement>document.getElementById("logoUrl")).value===""?"https://dummyimage.com/400x400/6e6e6e/ffffff.jpg&text=+LOGO":(<HTMLInputElement>document.getElementById("logoUrl")).value,
      person: {
          id: 1
      }
  }
    this.add=false;
    this.json.postJson('https://portfolio-mb-arg-programa.herokuapp.com/api/experience/create', body).subscribe(res=>{
      this.ngOnInit();
    })
  }
  deleteExperience(id:any){
    this.json.deleteJson('https://portfolio-mb-arg-programa.herokuapp.com/api/experience/delete/' + id).subscribe(res=>{
      this.ngOnInit();
    })
  }
  
  constructor(public json:JsonService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.json.getJson('https://portfolio-mb-arg-programa.herokuapp.com/api/experience/list').subscribe((res:any)=>{
      this.data = res
    })  
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
    }
  }
}
