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
  constructor(private _familiesService: FamiliesService) {}
  _deleteFamily() {
    this.family && this._familiesService.deleteFamily(this.family.lastName);
  }

  _handleHighlightChange(index: number) {
    const member = this.familyMembers?.toArray()[index];
    member?.highlight();
  }

  highlightAll() {
    for (const member of this.familyMembers?.toArray() || []) {
      member.highlight();
    }
  }
}
