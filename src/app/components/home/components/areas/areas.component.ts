import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { AreaService } from '../../services/areas.service';
import { Area } from '../../../../models/Area.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.css'
})
export class AreasComponent implements OnInit {
  public areaForm!: FormGroup;

  @Output() areaCreated = new EventEmitter<Area>();

  constructor(
    private areaService: AreaService,
    private formBuilder: FormBuilder,
  ) {
    
  }

  ngOnInit() {
    this.areaForm = this.formBuilder.group({
      name: ['', Validators.required]       
    });
  }

  onCreateArea() {
    const name = this.areaForm.get('name')?.value;
    const newArea: Area = { name };
    this.areaService.createArea(newArea).subscribe(
      (area: Area) => {
        console.log(area);
        this.areaCreated.emit(area);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}

