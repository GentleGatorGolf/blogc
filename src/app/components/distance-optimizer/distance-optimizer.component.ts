import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-distance-optimizer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="optimizer-container">
      <div class="comparison-header">
        <div class="header-item">
          <span class="label">Maximum Potential</span>
          <span class="value">{{ optimizedDistance() | number:'1.0-0' }}y</span>
        </div>
        <div class="gain-badge">
          SCENARIO COMPARISON
        </div>
        <div class="header-item right">
          <span class="label">The "Alignment" Gap</span>
          <span class="value negative">-{{ optimizedDistance() - lowLaunchDistance() | number:'1.0-0' }}y</span>
        </div>
      </div>

      <div class="comparison-track">
        <!-- Scenario 1: Low Launch, High Spin -->
        <div class="shot-row">
          <div class="shot-visual">
            <div class="image-container before">
              <img src="assets/images/before.jpg" alt="Before Alignment" class="comparison-img">
              <div class="status-overlay">BEFORE</div>
            </div>
          </div>
          <div class="shot-layer">
            <div class="ball-path" [style.width.%]="(lowLaunchDistance() / maxDistance) * 100">
              <span class="shot-label">Low Launch + High Spin (Ballooning)</span>
              <div class="ball-icon">●</div>
            </div>
            <div class="data-points">
              <span>Launch: 8°</span>
              <span>Spin: 4200 RPM</span>
              <span class="dist-tag">{{ lowLaunchDistance() }}y</span>
            </div>
          </div>
        </div>

        <!-- Scenario 2: Too High, Too Low Spin -->
        <div class="shot-row">
          <div class="shot-visual">
            <div class="image-container before">
              <img src="assets/images/before.jpg" alt="Before Alignment" class="comparison-img">
              <div class="status-overlay">BEFORE</div>
            </div>
          </div>
          <div class="shot-layer">
            <div class="ball-path" [style.width.%]="(highLaunchDistance() / maxDistance) * 100">
              <span class="shot-label">High Launch + Low Spin (Instability)</span>
              <div class="ball-icon">●</div>
            </div>
            <div class="data-points">
              <span>Launch: 16°</span>
              <span>Spin: 1600 RPM</span>
              <span class="dist-tag">{{ highLaunchDistance() }}y</span>
            </div>
          </div>
        </div>

        <!-- Scenario 3: Optimized -->
        <div class="shot-row">
          <div class="shot-visual">
            <div class="image-container after">
              <img src="assets/images/after.jpg" alt="After Alignment" class="comparison-img">
              <div class="status-overlay">AFTER</div>
            </div>
          </div>
          <div class="shot-layer optimized-shot">
            <div class="ball-path" [style.width.%]="(optimizedDistance() / maxDistance) * 100">
              <span class="shot-label">Perfect Optimization (The Alignment Result)</span>
              <div class="ball-icon highlight">●</div>
            </div>
            <div class="data-points">
              <span>Launch: 12.5°</span>
              <span>Spin: 2400 RPM</span>
              <span class="dist-tag highlight">{{ optimizedDistance() }}y</span>
            </div>
          </div>
        </div>

        <div class="distance-markers">
          <span>0y</span>
          <span>100y</span>
          <span>200y</span>
          <span>300y</span>
        </div>
      </div>

      <div class="insight-footer">
        <p><strong>The Reality:</strong> Most golfers lose 30-50 yards simply because their face is open or they launch it too high/low. Alignment tools don't just help you aim—they maximize your energy transfer.</p>
      </div>
    </div>
  `,
  styles: `
    .optimizer-container {
      padding: 3rem;
      background: #1a4a2b;
      border-radius: 16px;
      color: white;
      margin: 2rem 0;
    }

    .comparison-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .header-item {
      display: flex;
      flex-direction: column;
    }

    .header-item .label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: rgba(255,255,255,0.6);
      margin-bottom: 0.5rem;
    }

    .header-item .value {
      font-size: 2.5rem;
      font-weight: 800;
      color: #fff;
    }

    .header-item.right {
      text-align: right;
    }

    .value.negative {
      color: #ff5e5e;
    }

    .gain-badge {
      background: #ffcc00;
      color: #000;
      padding: 0.75rem 1.5rem;
      border-radius: 100px;
      font-weight: 900;
      font-size: 1.1rem;
      box-shadow: 0 4px 20px rgba(255,204,0,0.3);
    }

    .comparison-track {
      position: relative;
      padding: 2rem 0;
      display: flex;
      flex-direction: column;
      gap: 3.5rem;
    }

    .shot-row {
      display: flex;
      align-items: center;
      gap: 30px;
    }

    .shot-visual {
      flex: 0 0 140px;
      display: flex;
      justify-content: center;
    }

    .image-container {
      width: 130px;
      height: 90px;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid rgba(255,255,255,0.1);
      background: #000;
    }

    .comparison-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.8;
      transition: all 0.3s ease;
    }

    .status-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 4px;
      font-size: 0.6rem;
      font-weight: 900;
      text-align: center;
      letter-spacing: 0.1em;
      background: rgba(0,0,0,0.6);
    }

    .image-container.before .status-overlay {
      color: #ff5e5e;
      border-bottom: 1px solid rgba(255, 94, 94, 0.3);
    }

    .image-container.after {
      border-color: #ffcc00;
      box-shadow: 0 0 15px rgba(255, 204, 0, 0.2);
    }

    .image-container.after .status-overlay {
      background: #ffcc00;
      color: #000;
    }

    .image-container.after .comparison-img {
      opacity: 1;
    }

    .shot-layer {
      flex-grow: 1;
      position: relative;
      height: 30px;
      background: rgba(255,255,255,0.05);
      border-radius: 20px;
    }

    .ball-path {
      position: absolute;
      left: 0;
      height: 100%;
      background: rgba(255,255,255,0.15);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
      transition: width 1.5s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .optimized-shot .ball-path {
      background: linear-gradient(90deg, transparent, #ffcc00);
    }

    .shot-label {
      position: absolute;
      left: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      color: rgba(255,255,255,0.9);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .ball-icon {
      font-size: 1.2rem;
      color: #fff;
      transform: translateX(50%);
    }

    .ball-icon.highlight {
      color: #ffcc00;
      text-shadow: 0 0 10px rgba(255,204,0,0.8);
    }

    .data-points {
      position: absolute;
      right: 0;
      top: -22px;
      display: flex;
      gap: 1rem;
      font-size: 0.7rem;
      font-weight: 800;
      color: rgba(255,255,255,0.4);
      text-transform: uppercase;
    }

    .dist-tag {
      color: rgba(255,255,255,0.8);
    }

    .dist-tag.highlight {
      color: #ffcc00;
    }

    .distance-markers {
      display: flex;
      justify-content: space-between;
      margin-top: 1.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: rgba(255,255,255,0.3);
    }

    .insight-footer {
      margin-top: 4rem;
      padding: 1.5rem;
      background: rgba(0,0,0,0.2);
      border-radius: 8px;
      font-style: italic;
      color: rgba(255,255,255,0.9);
      line-height: 1.6;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DistanceOptimizerComponent {
  maxDistance = 350;
  lowLaunchDistance = signal(215);
  highLaunchDistance = signal(235);
  optimizedDistance = signal(285);
}
