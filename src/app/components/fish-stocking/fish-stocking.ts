import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CageService } from '../../services/cage';

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

  constructor(private cageService: CageService) {}

  ngOnInit() {
    this.cages = this.cageService.getCages();

    this.cageStockingData = this.cages.map(cage => ({
      cage,
      fishNumber: null
    }));
  }

  /**
  * Collects and submits fish stocking records for the selected date.
  * 
  * Filters out cages with no fish number entered and logs a summary
  */

  submitStocking() {
    const result = {
      date: this.selectedDate,
      records: this.cageStockingData.filter(row => row.fishNumber !== null)
    };

    console.log(' Stocking Submitted:', result);
  }
}
