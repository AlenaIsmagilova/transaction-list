import { Component } from '@angular/core';
import { HEADER_MENU } from '../shared/constants/constants';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly HEADER_MENU = HEADER_MENU;
}
