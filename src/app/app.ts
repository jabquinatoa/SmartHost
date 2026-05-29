import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CatalogoComponent],
  templateUrl: './app.html',
})
export class AppComponent {
  title = 'smart-host';
}