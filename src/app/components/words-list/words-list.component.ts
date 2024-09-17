import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-words-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit {
  wordsDatabase: string[] = ["Thank you", "ありがとう",
                             "I see", "そっか",
                             "My name is", "私の名前は",
                             "Damn", "くそ",
                             "Pervert", "変態"];
  englishWords: string[] = [];
  shuffledEnglishWords: string[] = [];
  japaneseWords: string[] = [];
  shuffledJapaneseWords: string[] = [];

  firstClickedWord: string | null = null;
  lastClickedWord: string | null = null;
  firstWordIndex: number | null = null;
  lastWordIndex: number | null = null;

  // methods to load on component initialization
  ngOnInit(): void {
    this.getEnglishWords(this.wordsDatabase);
    this.shuffledEnglishWords = this.shuffle(this.englishWords);
    this.getJapaneseWords(this.wordsDatabase);
    this.shuffledJapaneseWords = this.shuffle(this.japaneseWords);
  }

  // method to shuffle an array of words
  shuffle(array: string[]): string[]
  {
    // Clone the array to avoid modifying the original
    const shuffledArray = [...array];
    // Iterate through the array in reverse order
    for (let i = shuffledArray.length - 1; i > 0; i--)
    {
      // Generate a random index 'j' between 0 and i (inclusive)
      const j = Math.floor(Math.random() * (i + 1));
      // Swap the elements at indices 'i' and 'j'
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  // method to extract english words from db
  getEnglishWords(words: string[]) {
    this.englishWords = [];
    for (let i = 0; i < words.length; i++) {
      if (i % 2 === 0) {
        this.englishWords.push(words[i]);
      }
    }
    return this.englishWords
  }

  // method to extract japanese words from db
  getJapaneseWords(words: string[]) {
    this.japaneseWords = [];
    for (let i = 0; i < words.length; i++) {
      if (i % 2 !== 0) {
        this.japaneseWords.push(words[i]);
      }
    }
    return this.japaneseWords
  }

  onClick(word: string, index: number) {
    if (this.firstClickedWord === null) {
      this.firstClickedWord = word;
      this.firstWordIndex = index;
      console.log(this.firstClickedWord + ' (index : ' + this.firstWordIndex + ') has been clicked first.' +
                  " its index in the words library is : " + this.wordsDatabase.indexOf(this.firstClickedWord));
    } else {
      this.lastClickedWord = word;
      this.lastWordIndex = index;
      console.log(this.lastClickedWord + ' (index : ' + this.lastWordIndex + ') has been clicked last.' +
                  " its index in the words library is : " + this.wordsDatabase.indexOf(this.lastClickedWord));
      this.pairMatch(this.firstClickedWord, this.lastClickedWord);
      this.resetSelection();
    }
  }

  resetSelection() {
    this.firstClickedWord = null;
    this.lastClickedWord = null;
    this.firstWordIndex = null;
    this.lastWordIndex = null;
  }



  // TODO : logic of pair selection. cannot select 2 words from the same language.
  // TODO : logic of pair matching
  // TODO : when 5 pairs have been successfully matched, alert or something

  pairMatch(firstClickedWord: string, lastClickedWord: string): boolean {
    // Check if the first word is English and the second word is Japanese
    const englishIndex = this.englishWords.indexOf(firstClickedWord);
    const japaneseIndex = this.japaneseWords.indexOf(lastClickedWord);

    // Check if the first word is Japanese and the second word is English
    const reverseEnglishIndex = this.englishWords.indexOf(lastClickedWord);
    const reverseJapaneseIndex = this.japaneseWords.indexOf(firstClickedWord);

    // Match check in both directions
    if ((englishIndex !== -1 && japaneseIndex === englishIndex) || // index = -1 if word is not in the english array.
      (reverseJapaneseIndex !== -1 && reverseJapaneseIndex === reverseEnglishIndex)) {
      console.log("It's a match.");
      return true;
    } else {
      console.log("Not a match.");
      return false;
    }
  }
}
