import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectCardComponent } from './project-card-component/project-card.component';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projectList = [
    {
      title: 'Clipboard to Color',
      description: 'A utility plugin for Krita that streamlines the color extraction process from images, websites, and other digital sources, converting color values into ready-to-use formats for painting and design workflows.',
      href: 'https://github.com/deatona404/clipboard-to-color',
      buttonText: 'View it on GitHub',
      note: 'Krita plugin',
      imageSrc: 'assets/images/clip-color.jpg',
      variant: 'clip-color',
      reverse: false
    }
  ] as const;
}
