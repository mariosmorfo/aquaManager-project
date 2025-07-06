import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * ListMenu component
 * 
 * This component renders a list menu with navigation links for various 
 * management functions in the application such as cage management, 
 * fish stocking, and mortality registration.
 */
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
