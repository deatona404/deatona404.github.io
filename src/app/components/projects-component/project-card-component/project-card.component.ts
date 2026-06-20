import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-project-card',
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() href = '#';
  @Input() buttonText = 'View';
  @Input() note = '';
  @Input() imageSrc = '';
  @Input() variant: 'clip-color' | 'alpha' | 'beta' | 'gamma' = 'clip-color';
  @Input() reverse = false;
}
