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
      // if (!match) {
      //   // row.dead = 0; 
      // }
    });
  }

 
}
