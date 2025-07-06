import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CageService {
  private cages: string[] = [];

  getCages(): string[] {
    return this.cages;
  }

  addCage(name: string) {
    this.cages.push(name);
  }

  deleteCage(index: number) {
    this.cages.splice(index, 1);
  }

  renameCage(index: number, newName: string): void {
  if (index >= 0 && index < this.cages.length) {
    this.cages[index] = newName;
  }
}

}