import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class JsonService{
    constructor(private http:HttpClient) { }

    getJson(url:string){
        return this.http.get(url)
    }
    postJson(url:string, body:any){
        return this.http.post(url, body)
    }
    updateJson(url:string, body:any){
        return this.http.put(url, body)
    }
    getAll(url:string): Observable<[]>{
        return this.http.get<[]>(url)
    }
    deleteJson(url:string){
        return this.http.delete(url)
    }
}