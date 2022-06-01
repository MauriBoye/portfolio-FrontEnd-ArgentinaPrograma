import { Component, OnInit } from '@angular/core';
import { JsonService } from '../../_services/json.service';
import { StorageService } from '../../_services/storage.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', 'project-drag-drop.component.css']
})
export class ProjectsComponent implements OnInit {

  drop(event: CdkDragDrop<{}>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  data: any  = [];
  add=false;
  edit=false;
  idEdit=0;
  isLoggedIn = false;
  username?: string;

  updateProject(){
    const body = {
      id: this.idEdit,
      name: (<HTMLInputElement>document.getElementById("name")).value,
      date: (<HTMLInputElement>document.getElementById("date")).value,
      description: (<HTMLInputElement>document.getElementById("description")).value,
      projectUrl: (<HTMLInputElement>document.getElementById("projectUrl")).value,
      imgUrl: (<HTMLInputElement>document.getElementById("imgUrl")).value===""?"https://cdn-icons-png.flaticon.com/512/853/853108.png?w=826":(<HTMLInputElement>document.getElementById("imgUrl")).value,
      person: {
          id: 1
      }
  }
    this.edit=false;
    this.json.updateJson('https://portfolio-mb-arg-programa.herokuapp.com/api/project/update', body).subscribe(res=>{
      this.ngOnInit();
    })
  }
  addProject(){
    const body = {
      name: (<HTMLInputElement>document.getElementById("name")).value,
      date: (<HTMLInputElement>document.getElementById("date")).value,
      description: (<HTMLInputElement>document.getElementById("description")).value,
      projectUrl: (<HTMLInputElement>document.getElementById("projectUrl")).value,
      imgUrl: (<HTMLInputElement>document.getElementById("imgUrl")).value===""?"https://cdn-icons-png.flaticon.com/512/853/853108.png?w=826":(<HTMLInputElement>document.getElementById("imgUrl")).value,
      person: {
          id: 1
      }
  }
    this.add=false;
    this.json.postJson('https://portfolio-mb-arg-programa.herokuapp.com/api/project/create', body).subscribe(res=>{
      this.ngOnInit();
    })
  }
  deleteProject(id:any){
    this.json.deleteJson('https://portfolio-mb-arg-programa.herokuapp.com/api/project/delete/' + id).subscribe(res=>{
      this.ngOnInit();
    })
  }
  
  constructor(public json:JsonService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.json.getJson('https://portfolio-mb-arg-programa.herokuapp.com/api/project/list').subscribe((res:any)=>{
      this.data = res
    })  
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
    }  
  }
}
