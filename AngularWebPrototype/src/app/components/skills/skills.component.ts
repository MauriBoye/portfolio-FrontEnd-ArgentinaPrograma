import { Component, OnInit } from '@angular/core';
import { JsonService } from '../../_services/json.service';
import { StorageService } from '../../_services/storage.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  drop(event: CdkDragDrop<{}>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }
  dropFrontEndType(event: CdkDragDrop<{}>) {
    moveItemInArray(this.frontEndType, event.previousIndex, event.currentIndex);
  }
  dropBackEndType(event: CdkDragDrop<{}>) {
    moveItemInArray(this.backEndType, event.previousIndex, event.currentIndex);
  }
  dropSoftType(event: CdkDragDrop<{}>) {
    moveItemInArray(this.softType, event.previousIndex, event.currentIndex);
  }
  dropToolsType(event: CdkDragDrop<{}>) {
    moveItemInArray(this.toolsType, event.previousIndex, event.currentIndex);
  }


  data: any  = [];
  frontEndType:any = [];
  backEndType:any = [];
  softType:any = [];
  toolsType:any = [];
  types:any = ["Front-End", "Back-End", "Soft", "Tools"]
  selectType:any = []
  add=false;
  edit=false;
  idEdit=0;
  idAdd="";
  isLoggedIn = false;
  username?: string;


  updateSkill(){
    const body = {
      id: this.idEdit,
      type: (<HTMLInputElement>document.getElementById("type")).value,
      name: (<HTMLInputElement>document.getElementById("name")).value,
      percentage: (<HTMLInputElement>document.getElementById("percentage")).value,
      person: {
          id: 1
      }
  }
    this.edit=false;
    this.json.updateJson('https://portfolio-mb-arg-programa.herokuapp.com/api/skill/update', body).subscribe(res=>{
      this.ngOnInit();
    })
  }
  addSkill(){
    const body = {
      type: (<HTMLInputElement>document.getElementById("type")).value,
      name: (<HTMLInputElement>document.getElementById("name")).value,
      percentage: (<HTMLInputElement>document.getElementById("percentage")).value,
      person: {
          id: 1
      }
  }
    this.add=false;
    this.json.postJson('https://portfolio-mb-arg-programa.herokuapp.com/api/skill/create', body).subscribe(res=>{
      this.ngOnInit();
    })
  }
  deleteSkill(id:any){
    this.json.deleteJson('https://portfolio-mb-arg-programa.herokuapp.com/api/skill/delete/' + id).subscribe(res=>{
      this.ngOnInit();
    })
  }
  
  constructor(public json:JsonService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.json.getJson('https://portfolio-mb-arg-programa.herokuapp.com/api/skill/list').subscribe((res:any)=>{
      this.data = res
      let front:any = []
      let back:any = []
      let soft:any = []
      let tools:any = []
      res.map((e:any)=>{
        switch (e.type) {
          case"Front-End":
            front.push(e)
            this.frontEndType = front
            break;
          case "Back-End":
            back.push(e)
            this.backEndType = back
            break;
          case "Soft": 
            soft.push(e)
            this.softType = soft
            break; 
          case "Tools":
            tools.push(e)
            this.toolsType = tools
            break;
        }
      })
    })
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
    }  
  }
}
