import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bienvenido a Angular';
  curso: string ='cuerso Spring 5 con Angular 7';
  profesor: string ='Wilmar Cachimbo';
}
