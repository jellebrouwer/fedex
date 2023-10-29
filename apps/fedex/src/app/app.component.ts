import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from '@fedex/ui';

@Component({
  standalone: true,
  imports: [RouterModule, NavComponent],
  selector: 'fedex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
