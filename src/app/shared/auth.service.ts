import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../assignments/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn=false;
  admin = false;

  users=[
    {
      id:1,
    email:"admin",
    password:"admin",
    isAdmin:true
    },
    {
      id:2,
    email:"user",
    password:"user",
    isAdmin:false
    }
  ]
  findUser(email:string,password:string,isAdmin:boolean) :Observable<User|undefined>{
    //console.log("getUser"+this.users.find(a=>a.email === email && a.password === password));
   return of(this.users.find(a=>a.email === email && a.password === password && a.isAdmin === isAdmin))
   //return this.http.post<User>(this.url,{email,password,isAdmin},this.HttpOptions);
  }

  constructor() { }

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }
  isAdmin(){
    this.admin = true;
  }
  isNotAdmin(){
    this.admin = false;
  }
  // renvoie une promesse qui est résolue si l'utilisateur est loggué
  checkIsAdmin(){
    const isUserAdmin = new Promise((resolve,reject) =>{
      resolve(this.admin && this.loggedIn);
    })
    return isUserAdmin;
  }

  checkIsLoggedIn(){
    const isUserLoggedIn = new Promise((resolve,reject) =>{
      resolve(this.loggedIn);
    })
    return isUserLoggedIn;
  }

}
