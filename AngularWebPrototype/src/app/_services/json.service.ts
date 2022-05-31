import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class JsonService{
    constructor(private http:HttpClient) { }

    getJson(url:string){
        return this.http.get(url, { withCredentials: true })
    }
    postJson(url:string, body:any){
        return this.http.post(url, body, { withCredentials: true })
    }
    updateJson(url:string, body:any){
        return this.http.put(url, body, { withCredentials: true })
    }
    getAll(url:string): Observable<[]>{
        return this.http.get<[]>(url, { withCredentials: true })
    }
    deleteJson(url:string){
        return this.http.delete(url, {withCredentials: true, responseType: 'blob'})
    }
}