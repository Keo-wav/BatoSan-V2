import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordsListComponent } from "./components/words-list/words-list.component";
import {NavbarComponent} from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WordsListComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BatosanV2';
}
