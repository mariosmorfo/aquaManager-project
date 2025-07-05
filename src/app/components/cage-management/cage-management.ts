import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CageService } from '../../services/cage';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
/**
 * CageManagement component handles displaying, adding, renaming, and deleting cage entries.
 * Uses FormsModule for inline editing and interacts with CageService for data storage.
 */
@Component({
  selector: 'app-cage-management',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, FormsModule, MatTableModule],
  templateUrl: './cage-management.html',
  styleUrls: ['./cage-management.css']
})

export class CageManagement {
  constructor(private cageService: CageService) {}

  dataSource = new MatTableDataSource<string>();
  displayedColumns: string[] = ['name', 'actions'];

  /** Tracks which cage rows are currently in edit mode */
  editIndexMap: { [index: number]: boolean } = {};

  /** Holds the temporary edited values for cages before saving */
  editValues: { [index: number]: string } = {};

  /** Returns the current list of cage names from the service */
  get cageList(): string[] {
    return this.cageService.getCages();
  }
  /**Load the cage list from localStorage through the service */ 
   ngOnInit(): void {
    
    this.dataSource.data = this.cageService.getCages();
  }

   /** Adds a new cage with a default generated name */
  addCage(): void {
    const name = `Cage Name ${this.cageList.length + 1}`;
    this.cageService.addCage(name);
    this.dataSource.data = [...this.cageService.getCages()]
  }

   /** Deletes a cage at the specified index and clears related state */
  deleteCage(index: number): void {
    this.cageService.deleteCage(index);
    delete this.editIndexMap[index];
    delete this.editValues[index];
    this.dataSource.data = [...this.cageList];
  }
  /**
   * Toggles between edit and save mode for a cage.
   * Saves the new name if already in edit mode.
   */

   toggleEdit(index: number): void {
    if (this.editIndexMap[index]) {
      const newName = this.editValues[index];
      this.cageService.renameCage(index, newName);
      this.editIndexMap[index] = false;
      this.dataSource.data = [...this.cageList];

    } else {
      this.editValues[index] = this.cageList[index];
      this.editIndexMap[index] = true;
    }
  }

 
}
