import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// SERVICES
import { AreaService } from './services/areas.service';
import { ProjectService } from './services/projects.service';
import { TasksProjectService } from './components/tasks/services/tasksProject.service';
import { TasksAreaService } from './components/tasks/services/tasksArea.service';
import { Area } from '../../models/Area.model';
import { Project } from '../../models/Project.model';
import { TaskProject } from '../../models/TasksProject.model';
import { TaskArea } from '../../models/TasksArea.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  panelSelected = 0;  
  actualSidebar = '';
  project: Project = {} as Project;
  area: Area = {} as Area;
  selectedProjectId: number = 0;
  selectedAreaId: number = 0;

  taskProject: TaskProject = {} as TaskProject;
  taskArea: TaskArea = {} as TaskArea;

  // Listas
  areas: Area[] = [];
  projects: Project[] = [];
  
  constructor(
    private readonly router: Router,
    private readonly tasksProjectService: TasksProjectService,
    private readonly tasksAreaService: TasksAreaService,
    private readonly areaService: AreaService,
    private readonly projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.loadAreas();
    this.loadProjects();
  }

  onPanelChange(index: number) {
    this.panelSelected = index;    
  }

  onProjectSelected(project: Project) {
    this.project = project;
    this.selectedProjectId = project.projectId as number;
    this.area = {} as Area;
    this.actualSidebar = 'tasks';
  }

  onAreaSelected(area: Area) {
    this.area = area;
    this.selectedAreaId = area.areasId as number;
    this.project = {} as Project;
    this.actualSidebar = 'tasks';
  }

  onChangeSidebar(sidebar: string) {
    this.actualSidebar = sidebar;
    this.project = {} as Project;
    this.area = {} as Area;
    this.selectedProjectId = 0;
    this.selectedAreaId = 0;
    this.taskProject = {} as TaskProject;
    this.taskArea = {} as TaskArea;
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

  onTaskProjectSelected(task: TaskProject) {    
    this.taskProject = task;
  }

  onTaskAreaSelected(task: TaskArea) { 
    this.taskArea = task;       
  }

  onProjectDeleted(projectId: number) {
    this.projectService.deleteProject(projectId).subscribe(() => {
      this.loadProjects();
    });
  }

  onAreaDeleted(areaId: number) {
    this.areaService.deleteArea(areaId).subscribe(() => {
      this.loadAreas();
    });
  }
}