import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [];

  constructor(private logginService:LoggingService, private http:HttpClient) { }

  url="http://localhost:8010/api/assignments";

  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url);
    // return of(this.assignments);
  }

  // renvoie comme Observable l'assignment dont l'id est passé
  // en paramètre, ou undefined s'il n'existe pas
  getAssignment(id:number):Observable<Assignment|undefined> {
    return this.http.get<Assignment>(this.url + "/" + id)
    .pipe(
      tap(a => {
        console.log("tap : " +a.nom)
      }),
      catchError(this.handleError<Assignment>(`getAssignment(id=${id})`))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
 };
 

  addAssignment(assignment:Assignment):Observable<any> {
    this.logginService.log(assignment.nom, "ajouté !");
    return this.http.post<Assignment>(this.url, assignment);

  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // On n'a besoin de rien faire pour le moment, puisque l'assignment est passé par référence
    // et que l'objet est modifié dans le tableau
    // Plus tard on utilisera un Web Service distant...
    
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignement(assignment:Assignment) :Observable<any> {
    //let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);

    this.logginService.log(assignment.nom, "supprimé !");


    //return of("Assignment supprimé")
    let deleteURI = this.url +"/" + assignment._id;
    return this.http.delete<Assignment>(deleteURI);
  }

  getNewId():number{
    return Math.floor(Math.random() * 10000);
  }

}
