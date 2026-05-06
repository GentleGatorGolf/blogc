import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <p>&copy; {{ currentYear }} Gentle Gator Golf. All Rights Reserved.</p>
    </footer>
  `,
  styles: `
    footer {
      padding: 2rem;
      text-align: center;
      background-color: var(--primary-green);
      color: var(--white);
      margin-top: auto;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();
}
