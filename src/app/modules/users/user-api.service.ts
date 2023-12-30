import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  SERVER_URL = "http://localhost:3000"
  constructor(private http:HttpClient) { }
  //add User Api
  addUserAPI(user:userModel){
    return  this.http.post(`${this.SERVER_URL}/users`,user)
  }

  //get all user
  getAllUserAPI(){
    return this.http.get(`${this.SERVER_URL}/users`)
  }

  //delete user
  deleteUserAPI(id:string){
    return this.http.delete(`${this.SERVER_URL}/users/${id}`)
  }

  //get user with id
  getUserAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/users/${id}`)
  }

  // update user api
  updateUserAPI(id:any,user:userModel){
    return this.http.put(`${this.SERVER_URL}/users/${id}`,user)
  }
}
