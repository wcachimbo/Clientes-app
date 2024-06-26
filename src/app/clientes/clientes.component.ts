import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls:['./cliente.service.css']

})
export class ClientesComponent implements OnInit{

  clientes: Cliente[]=  [];
  constructor(private clienteService: ClienteService){

  }

  ngOnInit(){

    this.clienteService.getClientes().subscribe(
      (clientes) => this.clientes = clientes

    );
  }

  delete(cliente: Cliente):void {

    Swal.fire({
      title: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar",
      denyButtonText: `No, Eliminar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)

          });
        Swal.fire('Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
     

      } else if (result.isDenied) {
        Swal.fire('Operación no realizada!',
              `Cliente ${cliente.nombre} no fue eliminado.`,
              'info');
      }
    });
  }

}