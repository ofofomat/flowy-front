import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TaskProject } from '../../../../../models/TasksProject.model';
import { TaskArea } from '../../../../../models/TasksArea.model';
import { Project } from '../../../../../models/Project.model';
import { Area } from '../../../../../models/Area.model';
import { Month } from '@syncfusion/ej2/schedule';

@Component({
  selector: 'app-task-infos',
  templateUrl: './task-infos.component.html',
  styleUrl: './task-infos.component.css'
})
export class TaskInfosComponent implements OnInit, OnChanges{

  @Input() taskProject: any;
  @Input() taskArea: any;

  date: string = '';
  title: string = '';
  description: string = '';
  recurrence: string = '';
  priority: string = '';
  
  constructor() { 
    
  }

  ngOnInit(): void {    
    this.loadTask();  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskProject'] || changes['taskArea']) {
      this.loadTask();
    }
  }

  loadTask() {
    this.title = this.taskProject.title || this.taskArea.title;
    this.description = this.taskProject.description || this.taskArea.description;
    this.priority = this.taskProject.priority || this.taskArea.priority;

    if (this.taskProject.tasksProjectId) {
      const day = this.taskProject.date.split('-')[2];
      const month = this.getMonth(parseInt(this.taskProject.date.split('-')[1]) - 1);
      const year = this.taskProject.date.split('-')[0];

      this.date = month + ' ' + day + ', ' + year;

      this.recurrence = '';      
    } else if (this.taskArea.tasksId) {
      const recurrenceTime = this.taskArea.recurrence.split('-')[0];
      const recurrenceType = this.taskArea.recurrence.split('-')[1];
      this.recurrence = recurrenceTime ? `${recurrenceTime} time per ${recurrenceType}` : `${recurrenceTime} times a ${recurrenceType}`;      
    }
  }

  getMonth(month: number) {
    const months: { [key: number]: string } = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    }
  
    return months[month];
  }


}
