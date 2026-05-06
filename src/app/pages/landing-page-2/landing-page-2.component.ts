import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../../components/banner/banner.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-landing-page-2',
  standalone: true,
  imports: [CommonModule, BannerComponent, HeaderComponent],
  templateUrl: './landing-page-2.component.html',
  styleUrl: './landing-page-2.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPage2Component {
  protected reviews = [
    {
      author: 'Greg C.',
      date: '7/21/2025',
      quote: "I'm a PGA instructor and I been testing both products out with my clients and golf classes. When I was telling them that they are not aiming in the right spot and using the tools to show them, it was an eye-opener.",
    },
    {
      author: 'Jonathan S.',
      date: '6/24/2025',
      quote: "This has helped me tremendously with my club face alignment. Fantastic product and I'm glad I purchased this.",
    },
    {
      author: 'Javier D.',
      date: '9/4/2024',
      quote: "Recently purchased the drive align to help with aiming during practice. Sticks well to the driver face. Customer service at its finest!! Thank you!!!",
    },
    {
      author: 'David D.',
      date: '5/27/2025',
      quote: "I have had a similar product for use with irons (magnetic) and found that to be useful. Always wished that there was something that would work with my driver so I was glad when this popped up in my Instagram feed.",
    },
    {
      author: 'Seth H.',
      date: '7/28/2025',
      quote: "Really nice tool. Not too big either so it fits in the golf bag. Helped me realize how my setup was leading to my slice.",
    },
    {
      author: 'Joe C.',
      date: '8/14/2025',
      quote: "Great product, let's you see the difference a proper set up, verses having hands too high or too low.",
    }
  ];

  protected products = [
    {
      title: 'Drive Align',
      price: '$34.99',
      rating: 5,
      reviews: 34,
      image: 'assets/images/drive_align.webp',
      description: 'Approach the ball consistently and confidently every time.',
      url: 'https://gentlegatorgolf.com/products/drive-align'
    },
    {
      title: 'Iron Align',
      price: '$34.99',
      rating: 5,
      reviews: 4,
      image: 'assets/images/Iron_Align.webp',
      description: 'Precision strikes from any lie on the course.',
      url: 'https://gentlegatorgolf.com/products/iron-align'
    },
    {
      title: 'Putt Align',
      price: '$49.99',
      rating: 5,
      reviews: 4,
      image: 'assets/images/putt-align.webp',
      description: 'The final touch for a perfect round of golf.',
      url: 'https://gentlegatorgolf.com/products/test-copy'
    },
  ];
}
