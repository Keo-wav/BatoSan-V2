import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordsListComponent } from "./components/words-list/words-list.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {Exercise1Component} from "./components/exercise-1/exercise-1.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WordsListComponent, NavbarComponent, Exercise1Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BatosanV2';

  shouldGenerateWords: boolean = false;

  toggleGenerateWords(): void {
    this.shouldGenerateWords = !this.shouldGenerateWords;
    console.log('click');
  }
}
