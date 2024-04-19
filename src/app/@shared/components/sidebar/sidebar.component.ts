import { Component } from '@angular/core';
import {ToggleDarkModeComponent} from "../toggle-dark-mode/toggle-dark-mode.component";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ToggleDarkModeComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
