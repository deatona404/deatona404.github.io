import { Routes } from '@angular/router';
import { AboutComponent } from './components/about-component/about.component';
import { HomeComponent } from './components/home-component/home.component';
import { ProjectsComponent } from './components/projects-component/projects.component';

export const routes: Routes = [
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: '', component: HomeComponent, title: 'Home' },
    { path: 'about', component: AboutComponent, title: 'About' },
    { path: 'projects', component: ProjectsComponent, title: 'Projects' }
];
