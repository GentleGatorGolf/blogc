import { ChangeDetectionStrategy, Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GolfBallTrajectory, TrajectoryResult } from '../../services/physics.service';

@Component({
  selector: 'app-trajectory-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="trajectory-container">
      <div class="shot-configurations">
        <div *ngFor="let config of shotConfigs(); let i = index" class="config-panel" [style.border-left-color]="config.color">
          <div class="panel-header" (click)="config.expanded = !config.expanded">
            <span class="shot-title">
              <span class="color-dot" [style.background]="config.color"></span>
              Shot {{ i + 1 }} - {{ shots()[i].carryDistance | number:'1.0-0' }}y
            </span>
            <div class="header-actions">
              <button class="icon-button delete" (click)="removeConfig(i); $event.stopPropagation()">✕</button>
              <span class="expand-icon">{{ config.expanded ? '▼' : '▶' }}</span>
            </div>
          </div>

          <div class="panel-content" *ngIf="config.expanded">
            <div class="controls-grid">
              <div class="control-group">
                <label>Ball Speed: {{ config.ballSpeed }} mph</label>
                <input type="range" [min]="80" [max]="200" [step]="1" [(ngModel)]="config.ballSpeed" (ngModelChange)="updateConfigs()">
              </div>
              <div class="control-group">
                <label>Launch Angle: {{ config.launchAngle }}°</label>
                <input type="range" [min]="5" [max]="25" [step]="1" [(ngModel)]="config.launchAngle" (ngModelChange)="updateConfigs()">
              </div>
              <!--
              <div class="control-group">
                <label>Spin Rate: {{ config.spinRate }} RPM</label>
                <input type="range" [min]="1500" [max]="4500" [step]="100" [(ngModel)]="config.spinRate" (ngModelChange)="updateConfigs()">
              </div>
              -->
              <div class="control-group">
                <label>Face Angle: {{ config.faceAngle }}°</label>
                <input type="range" [min]="-8" [max]="8" [step]="0.5" [(ngModel)]="config.faceAngle" (ngModelChange)="updateConfigs()">
              </div>
            </div>
          </div>
        </div>

        <div class="global-actions">
          <button class="add-button" (click)="addConfig()">+ ADD SHOT</button>
          <button class="clear-button" (click)="clearShots()">CLEAR ALL</button>
        </div>
      </div>

      <div class="views-grid">
        <div class="plot-area side-view">
          <span class="view-label">Side View</span>
          <svg viewBox="0 0 500 200" preserveAspectRatio="none">
            <!-- Ground line -->
            <line x1="0" y1="190" x2="500" y2="190" stroke="#ccc" stroke-width="2" />
            
            <!-- Grid lines -->
            <line x1="100" y1="185" x2="100" y2="195" stroke="#ccc" />
            <line x1="200" y1="185" x2="200" y2="195" stroke="#ccc" />
            <line x1="300" y1="185" x2="300" y2="195" stroke="#ccc" />
            <line x1="400" y1="185" x2="400" y2="195" stroke="#ccc" />

            <!-- Trajectory Paths -->
            <path *ngFor="let path of pathData()" [attr.d]="path.d" fill="none" [attr.stroke]="path.color" stroke-width="3" 
                  [class.animate-path]="isAnimating()" [style.--path-length]="1000" />
            
            <!-- Landing Point Indicators -->
            <ng-container *ngIf="!isAnimating()">
              <circle *ngFor="let shot of shots()" [attr.cx]="shot.carryDistance * 1.5" cy="190" r="4" [attr.fill]="shot.color" />
            </ng-container>
          </svg>
        </div>

        <div class="plot-area top-view">
          <span class="view-label">Top View</span>
          <svg viewBox="0 0 500 200" preserveAspectRatio="none">
            <!-- Fairway centerline -->
            <line x1="0" y1="100" x2="500" y2="100" stroke="#ccc" stroke-dasharray="4" />
            
            <!-- Distance Grid -->
            <line x1="100" y1="0" x2="100" y2="200" stroke="#eee" />
            <line x1="200" y1="0" x2="200" y2="200" stroke="#eee" />
            <line x1="300" y1="0" x2="300" y2="200" stroke="#eee" />
            <line x1="400" y1="0" x2="400" y2="200" stroke="#eee" />

            <!-- Top View Paths -->
            <path *ngFor="let path of topDownPathData()" [attr.d]="path.d" fill="none" [attr.stroke]="path.color" stroke-width="3"
                  [class.animate-path]="isAnimating()" [style.--path-length]="1000" />
            
            <!-- Landing Point Indicators -->
            <ng-container *ngIf="!isAnimating()">
              <circle *ngFor="let shot of shots()" [attr.cx]="shot.carryDistance * 1.5" [attr.cy]="100 + shot.sideCarry * 1.5" r="4" [attr.fill]="shot.color" />
            </ng-container>
          </svg>
        </div>
      </div>

      <div class="axis-labels">
        <span>0y</span>
        <span>100y</span>
        <span>200y</span>
        <span>300y</span>
      </div>
    </div>
  `,
  styles: `
    .trajectory-container {
      padding: 2.5rem;
      background: #fff;
    }

    .shot-configurations {
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .config-panel {
      border: 1px solid #eee;
      border-left: 5px solid transparent;
      border-radius: 8px;
      overflow: hidden;
      background: #f9f9f9;
    }

    .panel-header {
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      background: #fff;
      transition: background 0.2s;
    }

    .panel-header:hover {
      background: #f5f5f5;
    }

    .shot-title {
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .color-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .icon-button {
      background: none;
      border: none;
      font-size: 1rem;
      cursor: pointer;
      color: #999;
      transition: color 0.2s;
    }

    .icon-button.delete:hover {
      color: #e74c3c;
    }

    .panel-content {
      padding: 1.5rem;
      border-top: 1px solid #eee;
    }

    .controls-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.5rem;
    }

    .global-actions {
      display: flex;
      gap: 1rem;
      padding: 1rem 0;
      margin-top: 0.5rem;
    }

    .add-button {
      background: #34495e;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 700;
      cursor: pointer;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .views-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .plot-area {
      position: relative;
      background: #fff;
      border: 1px solid #f0f0f0;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }

    .view-label {
      position: absolute;
      top: 15px;
      left: 20px;
      font-size: 0.7rem;
      text-transform: uppercase;
      color: #b2bec3;
      font-weight: 800;
      letter-spacing: 0.1em;
      z-index: 10;
    }

    svg {
      width: 100%;
      height: 250px;
      margin-top: 10px;
    }

    .axis-labels {
      display: flex;
      justify-content: space-between;
      padding: 0 40px;
      font-size: 0.7rem;
      font-weight: 600;
      color: #b2bec3;
      margin-top: 1rem;
    }

    @media (max-width: 900px) {
      .views-grid { grid-template-columns: 1fr; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrajectoryDisplayComponent {
  private physics = new GolfBallTrajectory();
  private colors = ['#2b4c3f', '#e67e22', '#3498db', '#9b59b6', '#2ecc71', '#f1c40f'];

  isAnimating = signal(false);
  
  shotConfigs = signal<any[]>([]);

  shots = computed(() => {
    // Recompute all trajectories whenever shotConfigs or its properties change
    return this.shotConfigs().map(config => {
      const faceToPath = config.faceAngle - config.clubPath;
      const sideSpin = faceToPath * 300;
      const azimuth = (config.faceAngle * 0.85) + (config.clubPath * 0.15);

      const result = this.physics.simulate(
        config.ballSpeed,
        config.launchAngle,
        azimuth,
        config.spinRate,
        sideSpin
      );
      result.color = config.color;
      
      // We don't update config.carryDistance here to avoid side-effects in computed
      return result;
    });
  });

  constructor() {
    // Start with default shots
    this.addConfig();
    this.addConfig({ spinRate: 4000, launchAngle: 9 });
  }

  addConfig(overrides: Partial<any> = {}) {
    const color = this.colors[this.shotConfigs().length % this.colors.length];
    this.shotConfigs.update(configs => [...configs, {
      ballSpeed: 160,
      launchAngle: 12,
      spinRate: 2500,
      clubPath: 0,
      faceAngle: 0,
      color: color,
      expanded: true,
      carryDistance: 0,
      ...overrides
    }]);
  }

  removeConfig(index: number) {
    this.shotConfigs.update(configs => configs.filter((_, i) => i !== index));
  }

  updateConfigs() {
    this.shotConfigs.update(configs => [...configs]);
    this.animateShot();
  }

  pathData = computed(() => {
    return this.shots().map(shot => {
      const svgPoints = shot.points.map(p => {
        const x = p.x * 1.09361 * 1.5;
        const z = p.z * 1.09361 * 1.5;
        return `${x},${190 - z}`;
      });
      return {
        d: `M ${svgPoints.join(' L ')}`,
        color: shot.color
      };
    });
  });

  topDownPathData = computed(() => {
    const startY = 100;
    return this.shots().map(shot => {
      const svgPoints = shot.points.map(p => {
        const x = p.x * 1.09361 * 1.5;
        const y = p.y * 1.09361 * 1.5;
        return `${x},${startY + y}`;
      });
      return {
        d: `M ${svgPoints.join(' L ')}`,
        color: shot.color
      };
    });
  });

  animateShot() {
    this.isAnimating.set(false);
    // Use a small timeout to trigger the animation keyframes again
    setTimeout(() => {
      this.isAnimating.set(true);
    }, 10);
  }

  clearShots() {
    this.shotConfigs.set([]);
    this.isAnimating.set(false);
  }
}
