import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TasksAreaService } from './services/tasksArea.service';
import { TasksProjectService } from './services/tasksProject.service';
import { Area } from '../../../../models/Area.model';
import { Project } from '../../../../models/Project.model';
import { TaskArea } from '../../../../models/TasksArea.model';
import { TaskProject } from '../../../../models/TasksProject.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateTime } from '@syncfusion/ej2/charts';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnChanges {

  
  @Input() project: Project = {} as Project;
  @Input() area: Area = {} as Area;
  
  public taskCount = 0;
  public tasksProject: TaskProject[] = [];
  public tasksArea: TaskArea[] = [];
  public title: string = '';
  public isProjectOrArea = '';
  public creatingTask = false;
  public taskProjectForm = {} as FormGroup;
  public taskAreaForm = {} as FormGroup;
  public projectForm!: FormGroup;
  
  constructor(
    private tasksProjectService: TasksProjectService,
    private tasksAreaService: TasksAreaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.taskProjectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required], 
      date: ['', Validators.required]           
    });
    this.taskAreaForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      recurrence: ['', Validators.required]
    });
    this.loadTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project'] || changes['area']) {
      this.creatingTask = false;
      this.loadTasks();
    }
  }

  loadTasks() {
    if (this.project && this.project.projectId) {
      this.tasksProjectService.getTasksByProjectId(this.project.projectId).subscribe(
        (tasks: TaskProject[]) => {
          this.tasksProject = tasks;
          this.taskCount = tasks.length;
          this.title = this.project.name;
          this.isProjectOrArea = 'project';
        },
        (error: any) => {
          console.error(error);
        }
      );
    } else if (this.area && this.area.areasId) {
      this.tasksAreaService.getTasksByAreaId(this.area.areasId).subscribe(
        (tasks: TaskArea[]) => {
          this.tasksArea = tasks;
          this.taskCount = tasks.length;
          this.title = this.area.name;
          this.isProjectOrArea = 'area';
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  onCreateTask() {    
    if (this.project && this.project.projectId) {
      const TaskProject = {
        title: this.taskProjectForm.value.title,
        description: this.taskProjectForm.value.description,
        date: new Date(),
        priority: this.taskProjectForm.value.priority,
      };
      this.tasksProjectService.createTask(this.project.projectId, TaskProject).subscribe(
        (task: TaskProject) => {
          this.tasksProject.push(task);
          this.taskCount = this.tasksProject.length;
          this.creatingTask = false;
        },
        (error: any) => {
          console.error(error);
        }
      );
    } else if (this.area && this.area.areasId) {
      const TaskArea = {
        title: this.taskAreaForm.value.title,
        description: this.taskAreaForm.value.description,
        recurrence: this.taskAreaForm.value.recurrence,
        priority: this.taskAreaForm.value.priority,
      };
      this.tasksAreaService.createTask(this.area.areasId, TaskArea).subscribe(
        (task: TaskArea) => {
          this.tasksArea.push(task);
          this.taskCount = this.tasksArea.length;
          this.creatingTask = false;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
    this.creatingTask = true;
  }
}
