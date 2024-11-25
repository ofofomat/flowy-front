import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectService } from '../../services/projects.service';
import { Project } from '../../../../models/Project.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  public projectForm!: FormGroup;

  @Output() projectCreated = new EventEmitter<Project>();

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
  ) {
    
  }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required]        
    });
  }
  onCreateProject() {
    const name = this.projectForm.get('name')?.value;
    const newProject: Project = { name, projectCheck: false};
    this.projectService.createProject(newProject).subscribe(
      (area: Project) => {
        console.log(area);
        this.projectCreated.emit(area);
      },
      (error: ErrorEvent) => {
        console.error(error);
      }
    );
  }

}
