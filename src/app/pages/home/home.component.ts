import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { VideoCardComponent } from '../../components/video-card/video-card.component';
import { FreeVideoComponent } from '../../components/free-video/free-video.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { BlurPasswordComponent } from '../../components/blur-password/blur-password.component';
import { CommonModule } from '@angular/common';
import { FREE_VIDEO_PASSWORD } from 'src/app/password.const';

@Component({
    selector: 'app-home',
    imports: [VideoCardComponent, FreeVideoComponent, ProductCardComponent, BlurPasswordComponent, CommonModule],
    template: `
    <app-blur-password *ngIf="!unlocked" (unlockedEvent)="onUnlocked($event)"></app-blur-password>
    <div [class.blurred]="!unlocked">
      <section class="hero" *ngIf="!freeVideoOnly">
        <h1>Welcome to Gentle Gator Golf</h1>
        <p>Your journey to a better golf game starts here. Browse our video tutorials below. <br> Presented by Gentle Gator Golf & Chris Spalla, Golf Digest's Best Young Teachers in America</p>
      </section>
      <section class="hero" *ngIf="freeVideoOnly">
        <h1>Free Video!</h1>
        <p>Below is Drive Align's introductury drill. Learn how to approach the ball consistently an confidently each time</p>
      </section>

      <section *ngIf="freeVideoOnly" class="free-video-wrapper">
        <div class="product-grid">
          @for (p of products(); track p.title) {
            <app-product-card [product]="p" />
          }
        </div>

        <app-free-video [video]="displayedVideos()[0]" />
      </section>

      <section *ngIf="!freeVideoOnly" class="video-grid">
        @for (video of displayedVideos(); track video.youtubeId) {
          <app-video-card [video]="video" />
        } @empty {
          <p>No video tutorials available at the moment. Please check back later!</p>
        }
      </section>
    </div>
  `,
    styles: `
    .hero {
      text-align: center;
      padding: 2rem 1rem;
      background-color: var(--white);
      border-radius: var(--border-radius);
      margin-bottom: 2rem;
    }

    .video-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .free-video-wrapper {
      max-width: 900px;
      margin: 0 auto 1.5rem;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .blurred {
      filter: blur(10px);
      pointer-events: none;
      user-select: none;
      opacity: 0.7;
      transition: all 0.3s ease;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  #videoService = inject(VideoService);
  protected readonly videos = this.#videoService.videos;
  protected unlocked = false;
  protected freeVideoOnly = false;

  protected products = () => [
      { title: 'Drive Align', price: '$34.99', rating: 5, reviews: 34, image: 'assets/images/drive_align.webp', url: 'https://gentlegatorgolf.com/products/drive-align' },
      { title: 'Iron Align', price: '$34.99', rating: 5, reviews: 4, image: 'assets/images/Iron_Align.webp', url: 'https://gentlegatorgolf.com/products/iron-align' },
      { title: 'Putt Align', price: '$49.99', rating: 5, reviews: 4, image: 'assets/images/putt-align.webp', url: 'https://gentlegatorgolf.com/products/test-copy' },
    ];

  protected displayedVideos = () => {
    const all = this.videos();
    return this.freeVideoOnly ? all.filter(v => v.title === 'Driver: Pre Shot Routine') : all;
  }

  protected onUnlocked(password?: string) {
    this.unlocked = true;
    if (password === FREE_VIDEO_PASSWORD) {
      this.freeVideoOnly = true;
    }
  }
}
