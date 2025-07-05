import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CageService } from '../../services/cage';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {  FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

/**
 * FishStocking component allows the user to select a date, cage, and number of fish.
 * Uses Reactive Forms to collect input and interacts with CageService to load cage options.
 */
@Component({
  selector: 'app-fish-stocking',
  standalone: true,
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './fish-stocking.html',
    providers: [provideNativeDateAdapter()],
  styleUrl: './fish-stocking.css'
})
export class FishStocking {
constructor(private cageService: CageService) {}

 /** Selected cage(s) from the multi-select dropdown */
selectedCages: string[] = [];

  /** Selected date from the date picker */
selectedDate: Date | null = null;

/** Form control for the fish number input; initialized to 0 */
showFishNumber = new FormControl(0);

/** List of available cage names loaded from the service */
cages: string[] = [];

 /**
   * Lifecycle hook that runs on component init.
   * Loads the list of cage names from CageService.
   */
ngOnInit(){
  console.log('Loaded cages:', this.cages);
  this.cages = this.cageService.getCages();
}
printStockingData() {
  console.log(' Fish Stocking Info:');
  console.log('Date:', this.selectedDate);
  console.log('Selected Cage:', this.selectedCages);
  console.log('Fish Number:', this.showFishNumber.value);
}

  
}
