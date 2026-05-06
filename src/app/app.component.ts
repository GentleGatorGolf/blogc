import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FooterComponent],
    template: `
    <main>
      <router-outlet />
    </main>
    <app-footer />
  `,
    styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    main {
      flex: 1;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
