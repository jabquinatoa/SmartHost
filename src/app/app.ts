import { Component } from '@angular/core';
import { CatalogoComponent } from './catalogo/catalogo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CatalogoComponent],
  templateUrl: './app.html',
})
export class AppComponent {
  title = 'smart-host';
}
