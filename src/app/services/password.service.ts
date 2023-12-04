import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService implements OnInit {

  url= 'http://localhost:3000/data'

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    return this.http.get(this.url)
  }

  addData(data:any){
    return this.http.post(this.url,data)
  }

  deleteData(id:any,data:any){
    return this.http.delete(`${this.url}/${id}`)
  }

}
