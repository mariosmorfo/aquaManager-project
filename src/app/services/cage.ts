import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CageService {
  private cages: string[] = [];

   constructor() {
    this.loadFromStorage(); 
  }

  private saveToStorage(): void {
    localStorage.setItem('cages', JSON.stringify(this.cages));
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem('cages');
    this.cages = stored ? JSON.parse(stored) : [];
  }

  getCages(): string[] {
    this.loadFromStorage();
    return this.cages;
  }

  addCage(name: string) {
    this.cages.push(name);
    this.saveToStorage()
  }

  deleteCage(index: number) {
    this.cages.splice(index, 1);
    this.saveToStorage();
  }

  renameCage(index: number, newName: string): void {
  if (index >= 0 && index < this.cages.length) {
    this.cages[index] = newName;
    this.saveToStorage()
  }
}

}