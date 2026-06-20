import { Component, HostBinding, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @HostBinding('class') hostClass = '';
  private router = inject(Router);

  constructor() {
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe((event) => {
      const route = event.urlAfterRedirects.split('?')[0].split('#')[0].replace(/^\//, '') || 'home';
      this.hostClass = route;
    });
  }
}
