import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CageService } from '../../services/cage';

/**
 * MortalityRegistration component allows the user to:
 * - Select a stocking date
 * - View all cages that were stocked with fish
 * - Register the number of mortalities per cage
 * 
 * The component validates input and ensures that only valid mortality data
 * (non-negative and not exceeding stocked values) is allowed for submission.
 */

@Component({
  selector: 'app-mortality-registration',
  standalone: true,
  templateUrl: './mortality-registration.html',
  styleUrls: ['./mortality-registration.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class MortalityRegistration {
  selectedDate: Date | null = null;

  cages: string[] = [];

  mortalityData: { cage: string, dead: number | null }[] = [];

  displayedColumns = ['cage', 'dead'];

  constructor(private cageService: CageService) {}

  ngOnInit(): void {
    this.cages = this.cageService.getCages();
  }

  /**
   * Loads stocking data from localStorage for the selected date.
   * Filters out cages that were not stocked.
   * Displays an alert if no stocking data is found.
   */

 loadForDate(): void {
  if (!this.selectedDate) return;

  const key = 'stocking:' + this.selectedDate.toISOString();
  const stored = localStorage.getItem(key);
  const stockingData: any[] = stored ? JSON.parse(stored) : [];

  if (stockingData.length === 0) {
    alert('No stocking data found for the selected date.');
    this.mortalityData = [];
    return;
  }

  const validStocked = stockingData.filter((s: any) => Number(s.fishNumber) > 0);

  this.mortalityData = validStocked.map((s: any) => ({
    cage: s.cage,
    dead: null
  }));

  console.log('Filtered cages for mortality:', this.mortalityData);
}
   /**
   * Submits mortality data after validating:
   * - No entries for cages that had 0 fish stocked
   * - No negative mortality values
   * - No mortality values greater than fish stocked
   * 
   * Alerts the user with details if any issues are found,
   * otherwise logs the valid mortality record to the console.
   */

  submitMortality(): void {
  const key = 'stocking:' + this.selectedDate?.toISOString();

  const stockingData = JSON.parse(localStorage.getItem(key) || '[]');

  const issues: string[] = [];

 this.mortalityData.forEach(row => {
  const stocked = stockingData.find((s: any) => s.cage === row.cage);
  const dead = row.dead;

  if (dead == null) return; 

  if (!stocked || Number(stocked.fishNumber) === 0) {
    if (dead > 0) {
      issues.push(`${row.cage}: cannot register mortality — no fish were stocked in this cage.`);
    }
    return;
  }

  if (dead < 0) {
    issues.push(`${row.cage}: negative values not allowed`);
  } else if (dead > Number(stocked.fishNumber)) {
    issues.push(`${row.cage}: ${dead} mortalities exceed the ${stocked.fishNumber} fish stocked`);
  }
});

  if (issues.length > 0) {
    alert('Invalid mortalities:\n' + issues.join('\n'));
    return;
  }

  console.log('Mortality registered:', {
    date: this.selectedDate,
    records: this.mortalityData
  });
}

}
