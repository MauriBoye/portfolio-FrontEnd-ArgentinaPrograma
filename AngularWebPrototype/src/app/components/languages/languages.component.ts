import { Component, OnInit } from '@angular/core';
import { JsonService } from '../../_services/json.service';
import { StorageService } from '../../_services/storage.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  drop(event: CdkDragDrop<{}>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  data: any  = [];
  add=false;
  edit=false;
  idEdit=0;
  isLoggedIn = false;
  username?: string;

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
    this.json.updateJson('https://portfolio-mb-arg-programa.herokuapp.com/api/language/update', body).subscribe(res=>{
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
    this.json.postJson('https://portfolio-mb-arg-programa.herokuapp.com/api/language/create', body).subscribe(res=>{
      this.ngOnInit();
    })
  }
  deleteLanguage(id:any){
    this.json.deleteJson('https://portfolio-mb-arg-programa.herokuapp.com/api/language/delete/' + id).subscribe(res=>{
      this.ngOnInit();
    })
  }
  
  constructor(public json:JsonService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.json.getJson('https://portfolio-mb-arg-programa.herokuapp.com/api/language/list').subscribe((res:any)=>{
      this.data = res
    })  
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
    }
  }
}
