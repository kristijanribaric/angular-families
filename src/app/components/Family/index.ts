import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { Family } from 'src/app/data';
import { FamiliesService } from '../../services/FamiliesService';
import { FamilyMemberComponent } from '../FamilyMember';
@Component({
  selector: 'app-family',
  templateUrl: './index.html',
  styleUrls: ['./style.css'],
})
export class FamilyComponent {
  @Input() family?: Family;
  @ViewChildren('child') familyMembers?: QueryList<FamilyMemberComponent>;
  constructor(private familiesService: FamiliesService) {}
  deleteFamily() {
    this.family && this.familiesService.deleteFamily(this.family.lastName);
  }

  handleHighlightChange(index: number) {
    const member = this.familyMembers?.find((member) => member.index === index);
    member?.highlight();
  }

  highlightAll() {
    for (const member of this.familyMembers?.toArray() || []) {
      member.highlight();
    }
  }
}
