import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Exercise1Component} from "../exercise-1/exercise-1.component";

@Component({
  selector: 'app-words-list',
  standalone: true,
  imports: [CommonModule, Exercise1Component],
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit {
  wordsDatabase: string[] = ["Thank you", "ありがとう",
                             "I see", "そっか",
                             "My name is", "私の名前は",
                             "Damn", "くそ",
                             "Pervert", "変態"];

  ngOnInit(): void {
  }
}
