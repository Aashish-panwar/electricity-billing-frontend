import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { HasRoleDirective } from '../directives/has-role.directive';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    HasRoleDirective
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}