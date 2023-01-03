import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Assignment } from './assignments/assignment.model';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
import { User } from './assignments/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion des assignments !!!';
  opened = false;
  email="";
  password="";
  isUserAdmin = false;
  userTransmis?:User ;





  constructor(private authService:AuthService, private router:Router, private assignmentService:AssignmentsService) {}

  login() {
    if(!this.authService.loggedIn) {
      this.authService.logIn();
    } else {
      this.authService.logOut();
      this.router.navigate(['/home']);

    }
  }

  innitiliserLaBaseAvecDonnesDeTest(){
    this.assignmentService.peuplerBDAvecForkJoin()
    .subscribe(() => {
      console.log("#### InitialiserLaBaseDeDonnesTeTest : DONNEES AJOUTEES ! ####");
      //afficher la liste des assignments
      this.router.navigate(['/home']);
    })

  }

  isAdmin(){
    //console.log("i'm here"+this.authService.loggedIn);
    if(!this.isUserAdmin ){
      this.authService.isAdmin();
      this.isUserAdmin = true;
    }else{
      this.authService.isNotAdmin();
     // this.router.navigate(['/assignments'])
     this.isUserAdmin=false;
    }
   }


  connection(){
    console.log("this.authService.admin",this.authService.admin);
    console.log("this.isUserAdmin",this.isUserAdmin);
    this.authService.findUser(this.email,this.password,this.isUserAdmin).subscribe((user) =>{
    this.userTransmis = user;
   
    console.log("this.userTransmis",this.userTransmis);
    if(/*this.email=="admin" && this.password =="admin"*/  this.userTransmis!==undefined){
      this.authService.logIn();
      //this.router.navigate(['/assignments'])
    }
    else{
      alert("email ou mot de passe Incorrect ")
    }
   });
  }

  isLoggedIn():boolean {
    // console.log("i'm here"+this.authService.admin);
     return this.authService.loggedIn;
   }

   disconnection(){
    this.authService.logOut();
   // this.router.navigate(['/assignments'])
    }

    isAdmin2():boolean {
      return this.authService.admin;
    }

}
