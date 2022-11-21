import { CreateUpdateModalComponent } from './create-update-modal/create-update-modal.component';
import { ProfesorService } from './../../../administrador/services/profesor.service';

import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { formatDate } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import { AssignCoursesComponent } from './assign-courses/assign-courses.component';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}


@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.scss']
})
export class DocenteComponent implements AfterViewInit, OnInit  {

  displayedColumns: string[] = ['id', 'name', 'email', 'dni', 'phone', 'role', 'grade', 'actions'];
  dataSource: MatTableDataSource<any>;
  dataStorage: any = [];
  LastRegister: number = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private docenteService: ProfesorService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.getTeachers();
  }

  getTeachers(): void {
    this.docenteService.obtenerDocentes().subscribe(
      res => {
        console.log(res);
        this.dataStorage = res;
        this.dataSource = new MatTableDataSource(res.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getLastRegister();
      }
    )
  }

  createUpdateTeacher(id: string, mode: string): void {
    console.log(id, mode);
    const dialogRef = this.dialog.open(CreateUpdateModalComponent, {
      data: {
        id,
        mode
      },
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTeachers();
    });
  }

  assignCourses(docente: any): void {
    console.log(docente);

    const dialogRef = this.dialog.open(AssignCoursesComponent, {
      data: {
        docente,
      },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTeachers();
    });
  }

  deleteTeacher(id: string): void {
    console.log(id);
  }

  getLastRegister(): any {

    const found = this.dataStorage.filter(e => formatDate(e.createdAt, 'dd-MM-yyyy','en-US') === formatDate(new Date() , 'dd-MM-yyyy','en-US'))
    this.LastRegister = found.length;
  }
  
  getTeacherAssign(): any {
    const founds = this.dataStorage.filter(element => element.aula.length > 0);

    return founds.length;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
