import { ActivatedRoute } from '@angular/router';
import { GradoService } from './../../services/grado.service';
import { AlumnoService } from './../../services/alumno.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-notas',
  templateUrl: './registro-notas.component.html',
  styleUrls: ['./registro-notas.component.scss']
})
export class RegistroNotasComponent implements OnInit {

  studentList = [];
  activeGrade: string = '';
  grade: any;
  headers = ['N°', 'Nombre', '1er Trimestre', '2do Trimestre', '3er Trimestre'];

  constructor(
    private studentService: AlumnoService,
    private gradoService: GradoService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getActiveRoute();
    this.getStudent();
  }

  getGrade(id: string): void {
    this.gradoService.getGrade(id).subscribe(
      res => {
        console.log(res);
        this.grade = res;
      }
    )
  }

  getStudent(): void {
    this.studentService.getStudents().subscribe(
      res => {
        this.studentList = res.filter(e => e.grado[0]._id === this.activeGrade);
        console.log(this.studentList);
      }
    )
  }

  getActiveRoute(): void {
    this.activeRoute.queryParamMap
      .subscribe((params) => {
        const paramss = { ...params.keys, ...params };
        
        // this.routeParamsID = paramss['params'].aula;
        this.activeGrade = paramss['params'].aula;
        this.getGrade(paramss['params'].aula);
      }
    );
  }


}
