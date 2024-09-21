import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exercise1Component } from '../exercise-1/exercise-1.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-words-list',
  standalone: true,
  imports: [CommonModule, Exercise1Component, HttpClientModule, NavbarComponent],
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit {
  @Input() triggerGeneration: boolean = false;
  wordsDatabase: string[] = [];
  apiKey: string = environment.apiKey;
  spreadsheetID: string = environment.spreadsheetID;
  sheetRange: string = environment.sheetRange;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getWords();
  }

  getWords(): void {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetID}/values/${this.sheetRange}?key=${this.apiKey}`;

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.values) {
          const rows = response.values;
          this.wordsDatabase = rows.flat();
          console.log('Successfully extracted Google Sheet data:', this.wordsDatabase);
        } else {
          console.error('No data found in response:', response);
        }
      },
      (error) => {
        console.error('Error fetching the Google Sheet data:', error);
      }
    );
  }

}
