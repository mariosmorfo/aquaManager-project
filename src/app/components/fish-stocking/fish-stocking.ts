import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CageService } from '../../services/cage';

/**
 * FishStocking component allows the user to:
 * - Select a date
 * - View all available cages
 * - Input fish stocking amounts per cage
 * 
 * It displays the data in a dynamic editable table.
 * Once submitted, the data is saved to localStorage by date.
 */

@Component({
  selector: 'app-fish-stocking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './fish-stocking.html',
  styleUrls: ['./fish-stocking.css']
})
export class FishStocking {

  selectedDate: Date | null = null;
 
  cages: string[] = [];

  cageStockingData: { cage: string, fishNumber: number | null }[] = [];

  displayedColumns = ['cage', 'fishNumber'];

  constructor(private cageService: CageService) {};

  /**
  * Lifecycle hook that runs on component load.
  * Loads cage names and sets up the initial stocking table rows.
  */

  ngOnInit() {
    this.cages = this.cageService.getCages();
    this.cageStockingData = this.cages.map(cage => ({
    cage,
    fishNumber: null
    })
  )}

  /**
   * Collects and submits fish stocking records for the selected date.
   *
   * Ensures that at least one cage has a non-null, non-zero fish number.
   * Filters out empty rows.
   * Saves the valid stocking data to localStorage using the date as a key.
   * Logs the result in the console.
   */
  submitStocking() {
    const hasData = this.cageStockingData.some(row => row.fishNumber !== null &&
    row.fishNumber !== 0)

    if(!hasData){
      alert('Please enter at least one fish number before submiting')
      return
    }  
     const hasNegative = this.cageStockingData.some(
      row => row.fishNumber !== null && row.fishNumber < 0
    ) ;

    if (hasNegative) {
    alert(' Fish number cannot be negative. Please correct your entries.');
    return;
    }
     const result = {
      date: this.selectedDate,
      records: this.cageStockingData.filter(row => row.fishNumber !== null)
    }
     const storageKey = 'stocking:' + this.selectedDate?.toISOString();
      // localStorage.setItem(storageKey, JSON.stringify(result.records));
      console.log('Stocking Submitted & Saved:', result);
   }
  }




