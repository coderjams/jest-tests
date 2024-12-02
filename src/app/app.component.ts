import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { pluck, range } from './shared/utils/utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {
    console.log('app', range(1, 5)); // [1, 2, 3, 4]
    console.log(pluck([{ name: 'John' }, { name: 'Doe' }], 'name')); // ['
  }
}
