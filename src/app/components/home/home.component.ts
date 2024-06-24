import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

//SERVICES
import { AreaService } from './services/areas.service';
import { ProjectService } from './services/projects.service';
import { TasksProjectService } from './components/tasks/services/tasksProject.service';
import { TasksAreaService } from './components/tasks/services/tasksArea.service';
import { Area } from '../../models/Area.model';
import { Project } from '../../models/Project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  panelSelected = 0;  
  actualSidebar = '';
  project: Project = {} as Project;
  area: Area = {} as Area;;

  // Listas
  areas: Area[] = [];
  projects: Project[] = [];
  
  constructor(
    private router: Router,
    private tasksProjectService: TasksProjectService,
    private tasksAreaService: TasksAreaService,
    private areaService: AreaService,
    private projectService: ProjectService
  ) {
    
  }

  ngOnInit(): void {
    this.loadAreas();
    this.loadProjects();
  }

  onPanelChange(index: number) {
    this.panelSelected = index;    
  }

  onProjectSelected(project: Project) {
    this.project = project;
    this.area = {} as Area;
    this.actualSidebar = 'tasks';
  }

  onAreaSelected(area: Area) {
    this.area = area;
    this.project = {} as Project;
    this.actualSidebar = 'tasks';
  }

  loadAreas() {
    this.areaService.getAllAreas().subscribe((areas: Area[]) => {
      this.areas = areas;
    });
  }

  loadProjects() {
    this.projectService.getAllProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }

  async logout() {
    // await this.authService.logout()
    return this.router.navigate(['']);
  }

}
