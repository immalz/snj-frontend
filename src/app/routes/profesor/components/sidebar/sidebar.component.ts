import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/routes/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuList: object[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.setItemList();
  }

  navigate(menu: any): void {

    // const found = this.menuList.find(element => element === menu);

    for (const item of this.menuList) {
        if(item === menu) {
          item['active'] = true;
          this.router.navigate([`docente/${item['route']}`])
        } else {
          item['active'] = false;
        }
    }
  }
  
  logout(): void {
    this.authService.loggout()
  }

  setItemList(): void {
    this.menuList = [
      {
        route: '/',
        title: 'Dashboard',
        icon: 'dashboard',
        active: true,
        submenu: []
      },
      {
        route: '/docentes',
        title: 'Docente',
        icon: 'group',
        active: false,
        submenu: []
      },
      {
        route: '/alumnos',
        title: 'Alumno',
        icon: 'person',
        active: false,
        submenu: []
      },
      {
        route: '/grados',
        title: 'Aulas',
        icon: 'folder_shared',
        active: false,
        submenu: []
      },
      {
        route: '/cursos',
        title: 'Curso',
        icon: 'book',
        active: false,
        submenu: []
      },
      {
        route: '/notas',
        title: 'Nota',
        icon: 'list_alt',
        active: false,
        submenu: []
      },
      {
        route: '/revision',
        title: 'Revisión',
        icon: 'border_color',
        active: false,
        submenu: []
      },
    ]
  }

}
