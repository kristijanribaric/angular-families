import { Component, Input } from '@angular/core';
import { Family } from 'src/app/data';
import { FamiliesService } from '../../services/FamiliesService';
@Component({
  selector: 'app-family',
  templateUrl: './index.html',
  styleUrls: ['./style.css'],
})
export class FamilyComponent {
  @Input() family?: Family;
  constructor(private familiesService: FamiliesService) {}
  deleteFamily() {
    this.family && this.familiesService.deleteFamily(this.family.lastName);
  }
}
