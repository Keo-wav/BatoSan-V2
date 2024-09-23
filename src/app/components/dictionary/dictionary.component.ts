import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.css'
})
export class DictionaryComponent implements OnInit {
  @Input() wordsDatabase: string[] = [];

  ngOnInit(): void {
    console.log(this.wordsDatabase);
  }


}
