import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [CommonModule]
})
export class AboutComponent {
  email = 'deatona404@vt.edu';
  showTooltip = false;
  tooltipText = 'Copy to clipboard';

  copyEmail() {
    navigator.clipboard.writeText(this.email).then(() => {
      this.tooltipText = 'Copied!';
      this.showTooltip = true;
      setTimeout(() => {
        this.tooltipText = 'Copy to clipboard';
        this.showTooltip = false;
      }, 2000);
    }).catch(() => {
      this.tooltipText = 'Failed to copy';
      this.showTooltip = true;
      setTimeout(() => {
        this.tooltipText = 'Copy to clipboard';
        this.showTooltip = false;
      }, 2000);
    });
  }

  onEmailHover() {
    this.showTooltip = true;
  }

  onEmailLeave() {
    if (this.tooltipText === 'Copy to clipboard') {
      this.showTooltip = false;
    }
  }
}
