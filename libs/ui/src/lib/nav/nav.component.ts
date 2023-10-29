import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'fedex-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  public showSignUpLink = true;
  constructor(private router: Router) {
    this.router.events.subscribe((res) => {
      if (res instanceof NavigationStart) {
        this.showSignUpLink = res.url !== '/auth/sign-up';
      }
    });
  }
}
