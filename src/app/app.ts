import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListMenu } from "./components/list-menu/list-menu";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  ListMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'aquaManager-project';
}
