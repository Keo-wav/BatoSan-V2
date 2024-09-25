import {Component, Input, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.css'
})
export class DictionaryComponent implements OnInit {
  @Input() wordsDatabase: string[] = [];
  @Input() englishWords: string[] = [];
  @Input() japaneseWords: string[] = [];

  ngOnInit(): void {
    console.log(this.wordsDatabase);
  }


}
