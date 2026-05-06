import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  template: `
    <div class="banner-container">
      <video autoplay muted loop playsinline class="banner-video">
        <source src="assets/images/harleytest.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="banner-overlay"></div>
    </div>
  `,
  styles: `
    .banner-container {
      position: relative;
      width: 100%;
      height: 500px;
      overflow: hidden;
    }

    .banner-video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1.25) translateY(-5%); /* Zoom and shift up slightly */
      transform-origin: center center;
    }

    .banner-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {}
