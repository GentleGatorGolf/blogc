import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProductCard {
  title: string;
  price: string;
  description?: string;
  rating: number;
  reviews: number;
  image?: string;
  url?: string;
  ctaText?: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (product(); as p) {
      <a class="card-link" [href]="p.url || '#'" target="_blank" rel="noopener">
        <article class="product-card">
          <div class="media" *ngIf="p.image">
            <img [src]="p.image" alt="{{ p.title }}" />
          </div>
          <div class="body">
            <h4>{{ p.title }}</h4>
            <div class="meta">
              <span class="stars">{{ '★'.repeat(p.rating) }}</span>
              <span class="reviews">({{ p.reviews }})</span>
            </div>
            <p class="desc">{{ p.description }}</p>
            <div class="price">{{ p.price }}</div>
            <div class="card-cta">
              <a class="btn primary" [href]="p.url" target="_blank" rel="noopener">{{ p.ctaText || 'Buy Now' }}</a>
            </div>
          </div>
        </article>
      </a>
    }
  `,
  styles: [`
    .card-link {
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .product-card {
      background: var(--white);
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      text-align: center;
      padding-bottom: 1rem;
    }

    .product-card .media {
      background: #f6f6f6;
      padding: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .product-card .media img {
      max-width: 120px;
      height: auto;
      display: block;
    }

    .product-card .body {
      padding: 0.75rem 1rem;
    }

    .product-card h4 {
      margin: 0.5rem 0 0.25rem;
      font-size: 1.05rem;
    }

    .product-card .meta {
      color: #f6b82d;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .product-card .price {
      color: #1e66d6;
      font-weight: 700;
      margin-top: 0.5rem;
    }
    .product-card .desc { color: #444; font-size:0.95rem; margin-top:0.5rem }
    .card-cta { margin-top:0.75rem }
    .card-cta .btn { padding:0.5rem 0.8rem; border-radius:6px; text-decoration:none; background:var(--primary); color:var(--white) }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  public product = input.required<ProductCard>();
}
