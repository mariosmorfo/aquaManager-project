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

@Component({
  selector: 'app-fish-stocking',
  standalone: true,
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, CommonModule, ReactiveFormsModule],
  templateUrl: './fish-stocking.html',
    providers: [provideNativeDateAdapter()],
  styleUrl: './fish-stocking.css'
})
export class FishStocking {
constructor(private cageService: CageService) {}

selectedCages: string[] = [];
selectedDate: Date | null = null;

showFishNumber = new FormControl(0);


cages: string[] = [];

ngOnInit(){
   console.log('Loaded cages:', this.cages);
  this.cages = this.cageService.getCages();
}

  
}
