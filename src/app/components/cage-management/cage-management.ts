import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cage-management',
  standalone: true,
  imports: [MatListModule, MatButtonModule, CommonModule],
  templateUrl: './cage-management.html',
  styleUrl: './cage-management.css'
})
export class CageManagement {
    cageList: string[] = ['Cage Name 1'];

 addCage() {
  const nextNumber = this.cageList.length + 1;
  const newName = `Cage Name ${nextNumber}`;
  console.log('Adding:', newName);
  this.cageList.push(newName);
}
}
