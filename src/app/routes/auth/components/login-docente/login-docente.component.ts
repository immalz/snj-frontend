import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-docente',
  templateUrl: './login-docente.component.html',
  styleUrls: ['./login-docente.component.scss']
})
export class LoginDocenteComponent implements OnInit {

  formularioProfesores: FormGroup;
  hide = true;

  constructor(private builder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    this.formularioProfesores = this.builder.group({
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      contraseña: ['', Validators.required]
    });
  }


  Acceder(): any {
    this.authService.signInDocente(this.formularioProfesores.value)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('rol', res.profesorEncontrado.roles[0].nombre);
          localStorage.setItem('docente', JSON.stringify(res.profesorEncontrado));

          this.router.navigate(['/docente']);
        },
        err => {
          console.log(err);
          Swal.fire(
            'Plataforma Virtual',
            `${err.error.message}`,
            'error'
          );
        }
      );
  }

}
