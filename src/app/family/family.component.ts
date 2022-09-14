import { Component, Input } from '@angular/core';
import { FamiliesService } from '../services/families.service';
@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css'],
})
export class FamilyComponent {
  @Input() lastName: string = '';
  @Input() members: string[] = [];
  constructor(private familiesService: FamiliesService) {}
  deleteFamily() {
    this.familiesService.deleteFamily(this.lastName);
  }
}
