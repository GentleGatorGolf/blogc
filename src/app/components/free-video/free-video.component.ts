import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoTutorial } from '../../models/video-tutorial.model';

@Component({
  selector: 'app-free-video',
  standalone: true,
  template: `
    @if (video(); as v) {
      <article class="lp-container">
        <!-- Sales Header -->
        <header class="sales-header">
          <p class="featured-badge">NEW: DRIVE ALIGN SYSTEM</p>
          <h1 class="headline">New Training Aid Fixes “Dang Near Everything” in as Little as ONE Swing</h1>
          <p class="sub-headline">Flush contact…consistent ball flight…lower scores? It’s actually easy, just follow the line! Watch the video below to discover how.</p>
        </header>

        <!-- Video Section -->
        <section class="video-section">
          <div class="video-wrapper shadow-lg">
            <div class="video-container">
              <iframe
                [src]="safeYoutubeUrl()"
                loading="lazy"
                style="border:0;position:absolute;top:0;height:100%;width:100%;"
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                allowfullscreen="true"
                title="Free video player for {{ v.title }}"
              ></iframe>
            </div>
          </div>
          <div class="video-caption">
            <p><strong>{{ v.title }}</strong>: {{ v.description }}</p>
          </div>
        </section>

        <!-- Product Benefits Section -->
        <section class="benefits-section">
          <div class="section-header">
            <h2>What is Drive Align?</h2>
            <p class="lead">The ultimate training aid for golfers who want flush contact, consistent ball flight, and lower scores.</p>
          </div>

          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon">🎯</div>
              <h3>Fix Your Alignment</h3>
              <p>Square the club face with instant visual feedback and optimize ball position for a high-launch setup.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🚀</div>
              <h3>Maximize Distance</h3>
              <p>Reduce spin to maximize carry distances and eliminate those short, weak flights caused by excessive backspin.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">⛳</div>
              <h3>Hit More Fairways</h3>
              <p>Eliminate wasted efficiency from open/closed club faces and start hitting baby draws on command.</p>
            </div>
          </div>
        </section>

        <!-- Testimonials Section -->
        <section class="testimonials-section">
          <h2>See What Our Customers Say</h2>
          <div class="testimonials-grid">
            <div class="testimonial-card">
              <div class="stars">⭐⭐⭐⭐⭐</div>
              <p class="quote">"I’m a PGA instructor and I been testing both products out with my clients and golf classes. When I was telling them that they are not aiming in the right spot and using the tools to show them, it was an eye-opener. I would recommend these products, especially for the driver! Thanks again 🙏🏽"</p>
              <p class="author">- Greg C., PGA Instructor</p>
            </div>
            <div class="testimonial-card">
              <div class="stars">⭐⭐⭐⭐⭐</div>
              <p class="quote">"This has helped me tremendously with my club face alignment. Fantastic product and I’m glad I purchased this."</p>
              <p class="author">- Jonathan S.</p>
            </div>
            <div class="testimonial-card">
              <div class="stars">⭐⭐⭐⭐⭐</div>
              <p class="quote">"Always wished that there was something that would work with my driver so I was glad when this popped up. Sticks well to the driver face. You really can’t be sure your alignment is correct unless you are using this as the curved face on a driver, plus the fact that we stand 90 degrees to the target line, really can distort perception of where you’re aimed. Highly recommend."</p>
              <p class="author">- David D.</p>
            </div>
            <div class="testimonial-card">
              <div class="stars">⭐⭐⭐⭐⭐</div>
              <p class="quote">"What a great product! The Drive Align exceeded my expectations in every way. The customer service was outstanding from start to finish: quick shipping, clear instructions, and they even followed up to make sure I was getting the results I wanted. What really impressed me was how quickly the Drive Align revealed issues with my setup. After the first session, it showed me that my driver face was slightly closed at address. The visual feedback is incredibly precise and helped me see and feel a square driver face at address and impact. The results were immediate. After that single session, my drives became noticeably more consistent. It's a great tool to use anytime but especially warming up before a round to ensure you are starting from a good position."</p>
              <p class="author">- Matt G.</p>
            </div>
          </div>
        </section>

        <!-- Features List -->
        <section class="features-list">
          <div class="content-wrapper">
            <h2>Why It Works</h2>
            <p>Instead of listening to instructions and trying to process what you\'ve learned in your brain and translate it to the movements of your body... Drive Align teaches your body <strong>DIRECTLY</strong> what to do.</p>
            <ul class="feature-bullets">
              <li><strong>Instant Feedback:</strong> You\'ll know if you\'re aligned correctly in just one swing.</li>
              <li><strong>Constraints-Led Learning:</strong> Forces your hands and body to swing on the correct plane.</li>
              <li><strong>Versatile Design:</strong> Works for drivers, woods, and irons.</li>
              <li><strong>Simple & Portable:</strong> Fits in your bag, use it on the range or at home.</li>
            </ul>
          </div>
        </section>

        <!-- Bonus Section -->
        <section class="bonus-section">
          <div class="bonus-box">
            <span class="bonus-label">FREE BONUS INCLUDED</span>
            <h2>Exclusive 10-Part Video Training Series</h2>
            <p>Get instant access to a comprehensive masterclass developed by <strong>Golf Digest "Best Young Teacher" Award Winner, Chris Spalla</strong>.</p>
            <div class="bonus-features">
              <div class="bonus-item">✓ 10 High-Definition Drills</div>
              <div class="bonus-item">✓ Step-by-Step Implementation</div>
              <div class="bonus-item">✓ Mobile-Ready for the Range</div>
            </div>
          </div>
        </section>

        <!-- Instructor Bio -->
      <section class="instructor-bio">
          <div class="bio-content">
            <div class="bio-header">
              <div class="bio-img-container">
                <img src="assets/images/ChrisSpalla.jpg" alt="Chris Spalla - Award Winning Golf Instructor" class="bio-img">
              </div>
              <div class="award-badge">Golf Digest Best Young Teacher</div>
              <h2>Meet Your Instructor: Chris Spalla</h2>
              <p class="title">Director of Golf Instruction, Shingle Creek Golf Academy</p>
            </div>
            <div class="bio-text">
              <p>Chris Spalla, a native of Chicago, developed his elite eye for detail and passion for golf into a world-class instructional career. Having spent over six years training under world-renowned master instructors, Chris has mastered the art of efficiently assembling a better golf swing for any player—from absolute beginners to top touring professionals.</p>
              <p>As a <strong>Master Club Fitter</strong> and certified equipment specialist, Chris brings a level of technical precision to instruction that is rare in the industry. His dedication to the "intricacies of the swing" and his students' rapid success earned him the prestigious recognition as one of <strong>Golf Digest’s Best Young Teachers</strong>.</p>
              <p>Today, Chris continues to lead player development at the state-of-the-art Shingle Creek Golf Academy, where he helps golfers reach their maximum potential through modern, physics-based methodology and instant-feedback drills.</p>
            </div>
          </div>
        </section>

        <!-- Guarantee Section -->
        <section class="guarantee-section">
          <div class="guarantee-badge">
            <span class="shield">🛡️</span>
            <h3>30-Day Improvement Guarantee</h3>
            <p>See real improvement in your game within 30 days or send it back for a full refund. No hassle. No gimmicks.</p>
          </div>
        </section>

        <!-- Call to Action -->
        <section class="cta-section">
          <a href="https://gentlegatorgolf.com/products/drive-align" target="_blank" class="cta-button">
            GET DRIVE ALIGN NOW - START FIXING YOUR SWING
          </a>
          <p class="shipping-info">Orders over $50 Ship Free! • 100% Secure Checkout</p>
        </section>
      </article>
    }
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      background: #fdfdfd;
      color: #333;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    .lp-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0;
    }

    /* Sales Header */
    .sales-header {
      text-align: center;
      padding: 3rem 1rem 2rem;
    }

    .featured-badge {
      display: inline-block;
      background: #ce0000;
      color: white;
      padding: 0.4rem 1rem;
      border-radius: 4px;
      font-weight: 700;
      font-size: 0.85rem;
      margin-bottom: 1.5rem;
    }

    .headline {
      font-size: 2.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: #1a1a1a;
    }

    .sub-headline {
      font-size: 1.25rem;
      color: #444;
      max-width: 750px;
      margin: 0 auto;
      line-height: 1.5;
    }

    /* Video Section */
    .video-section {
      padding: 1rem;
      margin-bottom: 3rem;
    }

    .video-wrapper {
      position: relative;
      background-color: black;
      border: 4px solid #fff;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      border-radius: 8px;
      overflow: hidden;
    }

    .video-container {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
      height: 0;
    }

    .video-caption {
      margin-top: 1rem;
      text-align: center;
      font-size: 0.95rem;
      color: #666;
    }

    /* Benefits Section */
    .benefits-section {
      padding: 4rem 1.5rem;
      background: #f9f9f9;
      border-radius: 12px;
      margin-top: 2rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-header h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .benefit-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      text-align: center;
    }

    .benefit-icon {
      font-size: 2.5rem;
      margin-bottom: 1.25rem;
    }

    .benefit-card h3 {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .benefit-card p {
      line-height: 1.6;
      color: #555;
    }

    /* Testimonials Section */
    .testimonials-section {
      padding: 4rem 1.5rem;
      background: #1a1a1a;
      color: white;
      text-align: center;
    }

    .testimonials-section h2 {
      margin-bottom: 3rem;
      font-size: 2rem;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    .testimonial-card {
      background: #2a2a2a;
      padding: 2.5rem 1.5rem;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: transform 0.3s ease;
    }

    .testimonial-card:hover {
      transform: scale(1.02);
    }

    .stars {
      color: #ffcc00;
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    .quote {
      font-style: italic;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .author {
      font-weight: 700;
      font-size: 0.95rem;
      color: #aaa;
    }

    /* Bonus Section */
    .bonus-section {
      padding: 4rem 1.5rem;
      text-align: center;
    }

    .bonus-box {
      border: 3px solid #ce0000;
      padding: 3rem;
      border-radius: 12px;
      max-width: 700px;
      margin: 0 auto;
      background: #fffafa;
    }

    .bonus-label {
      background: #ce0000;
      color: white;
      padding: 0.25rem 0.75rem;
      font-weight: 800;
      font-size: 0.75rem;
      border-radius: 4px;
    }

    .bonus-box h2 {
      margin: 1.5rem 0 1rem;
      font-size: 1.8rem;
    }

    .bonus-features {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 1.5rem;
      flex-wrap: wrap;
    }

    .bonus-item {
      font-weight: 700;
      color: #333;
    }

    /* Instructor Bio */
    .instructor-bio {
      padding: 5rem 1.5rem;
      background: #f4f4f4;
    }

    .bio-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .bio-header {
      margin-bottom: 2rem;
      text-align: center;
    }

    .bio-img-container {
      margin-bottom: 2rem;
    }

    .bio-img {
      width: 250px;
      height: 250px;
      object-fit: cover;
      border-radius: 50%;
      border: 5px solid white;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }

    .award-badge {
      display: inline-block;
      background: #fff;
      color: #000;
      border: 1px solid #ddd;
      padding: 0.3rem 0.8rem;
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }

    .bio-header h2 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .bio-header .title {
      font-weight: 700;
      color: #666;
      font-size: 1.1rem;
    }

    .bio-text p {
      line-height: 1.7;
      margin-bottom: 1.2rem;
      color: #444;
    }

    /* Guarantee Section */
    .features-list {
      padding: 4rem 1.5rem;
    }

    .features-list .content-wrapper {
      max-width: 650px;
      margin: 0 auto;
    }

    .features-list h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }

    .feature-bullets {
      list-style: none;
      padding: 0;
      margin-top: 2rem;
    }

    .feature-bullets li {
      position: relative;
      padding-left: 2rem;
      margin-bottom: 1.25rem;
      font-size: 1.1rem;
      line-height: 1.4;
    }

    .feature-bullets li::before {
      content: "✅";
      position: absolute;
      left: 0;
      top: 2px;
    }

    /* Guarantee Section */
    .guarantee-section {
      padding: 3rem 1.5rem;
      text-align: center;
    }

    .guarantee-badge {
      border: 2px dashed #ccc;
      padding: 2.5rem;
      border-radius: 15px;
      display: inline-block;
      max-width: 500px;
    }

    .shield {
      font-size: 3rem;
      display: block;
      margin-bottom: 1rem;
    }

    .guarantee-badge h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    /* CTA Section */
    .cta-section {
      text-align: center;
      padding: 4rem 1.5rem 6rem;
    }

    .cta-button {
      display: inline-block;
      background: #ce0000;
      color: white;
      padding: 1.25rem 2.5rem;
      font-size: 1.35rem;
      font-weight: 800;
      text-decoration: none;
      border-radius: 5px;
      box-shadow: 0 4px 20px rgba(206, 0, 0, 0.3);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(206, 0, 0, 0.4);
      background: #b20000;
    }

    .shipping-info {
      margin-top: 1.5rem;
      font-size: 0.9rem;
      color: #888;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .headline {
        font-size: 1.8rem;
      }
      .sub-headline {
        font-size: 1.1rem;
      }
      .cta-button {
        padding: 1rem 1.5rem;
        font-size: 1.1rem;
        width: 100%;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FreeVideoComponent {
  public video = input.required<VideoTutorial>();
  #sanitizer = inject(DomSanitizer);
  public safeYoutubeUrl = computed(() => {
    const videoId = this.video().youtubeId;
    const url = `https://iframe.mediadelivery.net/embed/503806/${videoId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`;
    return this.#sanitizer.bypassSecurityTrustResourceUrl(url);
  });
}
