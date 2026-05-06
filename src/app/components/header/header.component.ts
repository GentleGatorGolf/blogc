import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-header',
    imports: [NgOptimizedImage],
    template: `
<header>
  <a href="/">
    <img
      ngSrc="assets/images/Logo.PNG"
      alt="Gentle Gator Logo"
      width="200"
      height="50"
      priority
      style="width: 200px; height: 50px; object-fit: contain;"
    />
  </a>
  <span class="tagline">Home of Drive, Iron, and Putt Align</span>
</header>
  `,
    styles: `
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: var(--white);
      box-shadow: var(--box-shadow);
    }
    .tagline {
      font-style: italic;
      color: var(--primary-green);
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {}
