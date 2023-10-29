import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavComponent } from './nav.component';
import { Router, NavigationStart } from '@angular/router';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  describe('route is not /auth/sign-up', () => {
    it('should show the sign-up link', () => {
      const navigationStart = new NavigationStart(1, '/some-other-route');
      (router as any).events.next(navigationStart);
      fixture.detectChanges();
      expect(component.showSignUpLink).toBe(true);
    });
  });

  describe('route is /auth/sign-up', () => {
    it('should not show the sign-up link', () => {
      const navigationStartSignUp = new NavigationStart(2, '/auth/sign-up');
      (router as any).events.next(navigationStartSignUp);
      fixture.detectChanges();
      expect(component.showSignUpLink).toBe(false);
    });
  });
});
