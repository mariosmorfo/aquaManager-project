import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CageService } from '../../services/cage';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cage-management',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, FormsModule],
  templateUrl: './cage-management.html',
  styleUrls: ['./cage-management.css']
})
export class CageManagement {

  editIndexMap: { [index: number]: boolean } = {};
  editValues: { [index: number]: string } = {};
  constructor(private cageService: CageService) {}

  get cageList(): string[] {
    return this.cageService.getCages();
  }

  addCage(): void {
    const name = `Cage Name ${this.cageList.length + 1}`;
    this.cageService.addCage(name);
  }

  deleteCage(index: number): void {
    this.cageService.deleteCage(index);
    delete this.editIndexMap[index];
    delete this.editValues[index];
  }

   toggleEdit(index: number): void {
    if (this.editIndexMap[index]) {
      // Save action
      const newName = this.editValues[index];
      this.cageService.renameCage(index, newName);
      this.editIndexMap[index] = false;
    } else {
      // Enter edit mode
      this.editValues[index] = this.cageList[index];
      this.editIndexMap[index] = true;
    }
  }

 
}
