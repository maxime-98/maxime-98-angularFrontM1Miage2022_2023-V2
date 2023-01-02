import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Mon application sur les assignments';
  couleur = "violet";
  //pour la pagination
  totalDocs: number	= 1000;
  limit: number	= 	10;
  page: number	= 	1;
  totalPages: number	= 	100;
  pagingCounter: number	= 	1;
  hasPrevPage: boolean	= 	false;
  hasNextPage: boolean	= 	true;
  prevPage: number	= 	0;
  nextPage: number	= 	2;

  assignments!: Assignment[];

  assignmentSelectionne!: Assignment;

  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit(): void {
    this.assignmentsService
      .getAssignmentsPagine(this.page, this.limit)
      .subscribe((data) => {
        //Quand on rentre ici on sait que les données sont prêtes
        console.log("données reçues");
        this.assignments = data.docs;

        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log("données reçues");

      });
  }

  onAssignmentClicke(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }
}
