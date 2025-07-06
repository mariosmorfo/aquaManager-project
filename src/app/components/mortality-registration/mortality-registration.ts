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

  loadForDate(): void {
    if (!this.selectedDate) return;

    const key = 'stocking:' + this.selectedDate.toISOString();
    const stored = localStorage.getItem(key);
    const stockingData = stored ? JSON.parse(stored) : [];

    this.mortalityData = this.cages.map(cage => ({
      cage,
      dead: null
    }));

    this.mortalityData.forEach(row => {
      const match = stockingData.find((s: any) => s.cage === row.cage);
    });
  }
  submitMortality(): void {
    const key = 'stocking:' + this.selectedDate?.toISOString();
    const stockingData = JSON.parse(localStorage.getItem(key) || '[]');

    const issues: string[] = [];

    this.mortalityData.forEach(row => {
    const stocked = stockingData.find((s: any) => s.cage === row.cage);

      if (row.dead != null && row.dead < 0) {
          issues.push(` ${row.cage}: negative values not allowed`);
      }
      
      if (stocked && row.dead != null && row.dead > stocked.fishNumber) {
        issues.push(` ${row.cage}: ${row.dead} mortalities exceed the ${stocked.fishNumber} fish stocked`);
      }
    });

    if (issues.length > 0) {
      alert('Invalid mortalities:\n' + issues.join('\n'));
      return;
    }

    console.log(' Mortality registered:', {
      date: this.selectedDate,
      records: this.mortalityData
    });
  }

 
}
