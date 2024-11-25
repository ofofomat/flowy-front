import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { TasksAreaService } from './services/tasksArea.service';
import { TasksProjectService } from './services/tasksProject.service';
import { Area } from '../../../../models/Area.model';
import { Project } from '../../../../models/Project.model';
import { TaskArea } from '../../../../models/TasksArea.model';
import { TaskProject } from '../../../../models/TasksProject.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnChanges {

  @Input() project: Project = {} as Project;
  @Input() area: Area = {} as Area;

  @Output() taskProjectSelected = new EventEmitter<TaskProject>();
  @Output() taskAreaSelected = new EventEmitter<TaskArea>();

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
    private readonly tasksProjectService: TasksProjectService,
    private readonly tasksAreaService: TasksAreaService,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.taskProjectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['TRIVIAL', Validators.required],
      date: ['', Validators.required]
    });
    this.taskAreaForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['TRIVIAL', Validators.required], 
      recurrencTime: ['1', Validators.required],
      recurrenceType: ['day', Validators.required]
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
    if (this.project?.projectId) {
      this.tasksProjectService.getTasksByProjectId(this.project.projectId).subscribe(
        (tasks: TaskProject[]) => {
          this.tasksProject = tasks;
          this.taskCount = tasks.length;
          this.title = this.project.name;
          this.isProjectOrArea = 'project';
        },
        (error: ErrorEvent) => {
          console.error(error);
        }
      );
    } else if (this.area?.areasId) {
      this.tasksAreaService.getTasksByAreaId(this.area.areasId).subscribe(
        (tasks: TaskArea[]) => {
          this.tasksArea = tasks;
          this.taskCount = tasks.length;
          this.title = this.area.name;
          this.isProjectOrArea = 'area';
        },
        (error: ErrorEvent) => {
          console.error(error);
        }
      );
    }
  }

  onCreateTask() {
    if (this.project?.projectId) {
      const TaskProject = {
        title: this.taskProjectForm.value.title,
        description: this.taskProjectForm.value.description,
        date: this.taskProjectForm.value.date,
        priority: this.taskProjectForm.get('priority')?.value,
      };
      this.tasksProjectService.createTask(this.project.projectId, TaskProject).subscribe(
        (task: TaskProject) => {
          console.log('Task created');
          this.tasksProject.push(task);
          this.taskCount = this.tasksProject.length;
          this.creatingTask = false;

          this.taskProjectForm.reset();
        },
        (error: ErrorEvent) => {
          console.error(error);
        }
      );
    } else if (this.area?.areasId) {
      const recurrence = `${this.taskAreaForm.value.recurrencTime}-${this.taskAreaForm.value.recurrenceType}`;
      const TaskArea = {
        title: this.taskAreaForm.value.title,
        description: this.taskAreaForm.value.description,
        recurrence: recurrence,
        priority: this.taskProjectForm.get('priority')?.value,
      };
      console.log(TaskArea);
      this.tasksAreaService.createTask(this.area.areasId, TaskArea).subscribe(
        (task: TaskArea) => {
          this.tasksArea.push(task);
          this.taskCount = this.tasksArea.length;
          this.creatingTask = false;

          this.taskAreaForm.reset();
        },
        (error: ErrorEvent) => {
          console.error(error);
        }
      );
    }
    this.creatingTask = true;
  }

  onTaskProjectSelected(task: TaskProject) {
    this.taskProjectSelected.emit(task);
  }

  onTaskAreaSelected(task: TaskArea) {
    this.taskAreaSelected.emit(task);
  }

  onDeleteTaskProject(task: TaskProject) {
    this.tasksProjectService.deleteTask(task.projectId as number, task.tasksProjectId as number).subscribe(
      () => {
        this.loadTasks();
      },
      (error: ErrorEvent) => {
        console.error(error);
      }
    );
  }

  onDeleteTaskArea(task: TaskArea) {
    this.tasksAreaService.deleteTask(task.areasId as number, task.tasksId as number).subscribe(
      () => {
        this.loadTasks();
      },
      (error: ErrorEvent) => {
        console.error(error);
      }
    );
  }

  onCreatingTask() {
    this.creatingTask = true;
    this.taskProjectSelected.emit({} as TaskProject);
    this.taskAreaSelected.emit({} as TaskArea);
  }
}
