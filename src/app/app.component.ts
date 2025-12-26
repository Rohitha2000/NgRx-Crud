import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarComponent } from './component/menubar/menubar.component';

@Component({
  selector: 'app-root',
  imports: [ MenubarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NgrxCrud';
}
