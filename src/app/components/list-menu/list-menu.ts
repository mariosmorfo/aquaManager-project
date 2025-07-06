import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-list-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './list-menu.html',
  styleUrl: './list-menu.css'
})
export class ListMenu {
  menu = [
    {text: "Cage Management", linkName:'cage-management'},
    {text: "Fish Stocking", linkName: 'fish-stocking'},
    {text: "Mortality Registration", linkName: 'mortality-registration'}
  ]
}
