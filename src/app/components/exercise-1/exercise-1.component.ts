import {Component, Input, SimpleChanges} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-exercise-1',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './exercise-1.component.html',
  styleUrl: './exercise-1.component.css'
})
export class Exercise1Component {
  @Input() wordsDatabase: string[] = [];
  @Input() shouldGenerateWords: boolean = false;

  englishWords: string[] = [];
  shuffledEnglishWords: string[] = [];
  japaneseWords: string[] = [];
  shuffledJapaneseWords: string[] = [];

  firstClickedWord: string | null = null;
  lastClickedWord: string | null = null;
  firstWordIndex: number | null = null;
  lastWordIndex: number | null = null;

  buttonStates: string[] = [];

  // methods to load on component initialization, after the database is populated
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wordsDatabase'] && this.wordsDatabase.length > 0) {
      this.getEnglishWords(this.wordsDatabase);
      this.shuffledEnglishWords = this.shuffle(this.englishWords);
      this.getJapaneseWords(this.wordsDatabase);
      this.shuffledJapaneseWords = this.shuffle(this.japaneseWords);
      this.displayExercise1();
    }

    if (changes['shouldGenerateWords'] && changes['shouldGenerateWords'].currentValue) {
      this.displayExercise1();
    }
  }

  // TODO : GENERATE 5 OTHER WORDS WHEN 5 PAIRS ARE MATCHED

  // choose random index numbers
  chooseWords(): void {
    // clear arrays
    this.shuffledEnglishWords = [];
    this.shuffledJapaneseWords = [];

    // settings definition
    const numberOfWords: number = 5;
    const selectedIndexes: Set<number> = new Set();

    // choosing the random indexes
    while (selectedIndexes.size < numberOfWords) {
      const randomIndex = Math.floor(Math.random() * this.englishWords.length);
      selectedIndexes.add(randomIndex);
    }

    // selecting en/jp words at same indexes
    selectedIndexes.forEach(index => {
      this.shuffledEnglishWords.push(this.englishWords[index]);
      this.shuffledJapaneseWords.push(this.japaneseWords[index]);
    })

    // Shuffle arrays again
    this.shuffledEnglishWords = this.shuffle(this.shuffledEnglishWords);
    this.shuffledJapaneseWords = this.shuffle(this.shuffledJapaneseWords);
  }

  displayExercise1() {
    this.chooseWords();
    this.buttonStates = [];
  }

  // TODO : USER IS ABLE TO SELECT HOW MANY WORDS PER PAGE

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

  getEnglishWords(words: string[]) {
    this.englishWords = [];
    for (let i = 0; i < words.length; i++) {
      if (i % 2 === 0) {
        this.englishWords.push(words[i]);
      }
    }
    return this.englishWords
  }

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

      if (this.lastClickedWord === this.firstClickedWord) {
        window.alert("That's the same word.");
      } else if (this.sameLanguageCheck(this.firstClickedWord, this.lastClickedWord)) {
        window.alert("Can't select a word from the same language.");
      } else {
        console.log('WORD 2 : ' + this.lastClickedWord);
        const isMatch = this.pairMatch(this.firstClickedWord, this.lastClickedWord);

        if (isMatch) {
          this.buttonStates[this.firstWordIndex!] = 'match';  // Mark as matched (green)
          this.buttonStates[this.lastWordIndex!] = 'match';   // Mark as matched (green)

          // Check if all pairs are matched only after marking the last pair as 'match'
          if (this.areAllPairsMatched()) {
            console.log('All pairs matched, generating new words...');

            // Delay generating new words to allow the UI to update the last matched pair
            setTimeout(() => {
              this.displayExercise1();
            }, 1500);
          }
        } else {
          this.buttonStates[this.firstWordIndex!] = 'mismatch';  // Mark as mismatched (red)
          this.buttonStates[this.lastWordIndex!] = 'mismatch';   // Mark as mismatched (red)
        }

        this.resetSelection();
      }
    }
  }

  areAllPairsMatched(): boolean {
    return this.buttonStates.filter(state => state === 'match').length === 10;
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
