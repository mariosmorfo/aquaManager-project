import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CageService } from '../../services/cage';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fish-stocking',
  standalone: true,
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatListModule, FormsModule, CommonModule],
  templateUrl: './fish-stocking.html',
    providers: [provideNativeDateAdapter()],
  styleUrl: './fish-stocking.css'
})
export class FishStocking {

selectedCages: string[] = [];
// selectedDate: Date | null = null;
constructor(private cageService: CageService) {}

cages: string[] = [];

ngOnInit(){
  //  console.log('Loaded cages:', this.cages);
  this.cages = this.cageService.getCages();
}

  
}
