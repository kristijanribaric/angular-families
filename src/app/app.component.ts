import { Component, OnInit } from '@angular/core';
import { FamiliesService } from './services/families.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  families: Record<string, string[]> = {};
  constructor(private familiesService: FamiliesService) {}

  ngOnInit() {
    this.families = this.familiesService.families;
  }
}
