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

  buttonStates: string[] = [];

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
      this.buttonStates[index] = 'selected';  // Mark as selected (blue)
      console.log('WORD 1 : ' + this.firstClickedWord);
    } else {
      this.lastClickedWord = word;
      this.lastWordIndex = index;
      if (this.sameLanguageCheck(this.firstClickedWord, this.lastClickedWord)) {
        window.alert("Can't select a word from the same language, you bitch ass");
      } else {
        console.log('WORD 2 : ' + this.lastClickedWord);
        const isMatch = this.pairMatch(this.firstClickedWord, this.lastClickedWord);

        if (isMatch) {
          this.buttonStates[this.firstWordIndex!] = 'match';  // Mark as matched (green)
          this.buttonStates[this.lastWordIndex!] = 'match';   // Mark as matched (green)
        } else {
          this.buttonStates[this.firstWordIndex!] = 'mismatch';  // Mark as mismatched (red)
          this.buttonStates[this.lastWordIndex!] = 'mismatch';   // Mark as mismatched (red)
        }

        this.resetSelection();
      }
    }
  }

  sameLanguageCheck(firstClickedWord: string, lastClickedWord: string): boolean {
    return (this.englishWords.includes(firstClickedWord) && this.englishWords.includes(lastClickedWord)) ||
      (this.japaneseWords.includes(firstClickedWord) && this.japaneseWords.includes(lastClickedWord));
  }

  resetSelection() {
    this.firstClickedWord = null;
    this.lastClickedWord = null;
    this.firstWordIndex = null;
    this.lastWordIndex = null;
  }

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
