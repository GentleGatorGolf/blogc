import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page-3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page-3.component.html',
  styleUrl: './landing-page-3.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPage3Component {
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
    },
  ];
}
