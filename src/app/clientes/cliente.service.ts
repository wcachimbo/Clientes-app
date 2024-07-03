import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json'
import { Cliente } from './cliente';
import { Observable , throwError} from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {

  private urlEndPoint:string='http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient , private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint)
  }

  create(cliente: Cliente): Observable<any>{
    return this.http.post<Cliente>(this.urlEndPoint,cliente, {headers: this.httpHeaders})
    .pipe( 
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.mensaje,"error");
          return throwError(e);
})
    );
  }

  getCliente(id:number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
     .pipe( 
        catchError(e => {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.mensaje,"error");
            return throwError(e);
  })

    );
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders})
      .pipe( 
        catchError(e => {
          if(e.status==400){
            return throwError(e);
          }  
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.mensaje,"error");
            return throwError(e);
  })
      );
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
    .pipe( 
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.mensaje,"error");
          return throwError(e);
})
    );

  }
}
