import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { TasksComponent } from './components/tasks/tasks.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AreasComponent } from './components/areas/areas.component';
import { TaskInfosComponent } from './components/tasks/task-infos/task-infos.component';

// SERVICES
import { AreaService } from './services/areas.service';
import { ProjectService } from './services/projects.service';
import { TasksProjectService } from './components/tasks/services/tasksProject.service';
import { TasksAreaService } from './components/tasks/services/tasksArea.service';

@NgModule({
  declarations: [HomeComponent, TasksComponent, ProjectsComponent, AreasComponent, TaskInfosComponent],
  imports: [
    SharedModule
  ],
  exports: [HomeComponent],
  providers: [TasksProjectService, TasksAreaService, AreaService, ProjectService]
})
export class HomeModule { }
