import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CageManagement } from './components/cage-management/cage-management';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CageManagement],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'aquaManager-project';
}
