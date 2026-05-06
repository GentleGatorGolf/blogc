import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrajectoryDisplayComponent } from '../../components/trajectory-display/trajectory-display.component';

@Component({
  selector: 'app-landing-page-4',
  standalone: true,
  imports: [CommonModule, TrajectoryDisplayComponent],
  templateUrl: './landing-page-4.component.html',
  styleUrl: './landing-page-4.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPage4Component {}
