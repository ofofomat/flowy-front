import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  panelSelected = 0;  
  
  constructor() {
  }

  ngOnInit() {
  }

  onPanelChange(index: number) {
    this.panelSelected = index;
  }
  
}
