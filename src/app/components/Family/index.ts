import {
  Directive,
  Component,
  Input,
  QueryList,
  ViewChildren,
  ContentChild,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Family } from 'src/app/data';
import { FamiliesService } from '../../services/FamiliesService';
import { FamilyMemberComponent } from '../FamilyMember';

@Directive({
  selector: '[appFamilyHeaderTemplate]',
})
export class FamilyComponentHeaderTemplate {}

export const FamilyComponentDependencies = [FamilyComponentHeaderTemplate];

@Component({
  selector: 'app-family',
  templateUrl: './index.html',
  styleUrls: ['./style.css'],
})
export class FamilyComponent {
  @Input() family?: Family;
  @ViewChildren('child') familyMembers?: QueryList<FamilyMemberComponent>;
  @ContentChild(FamilyComponentHeaderTemplate, {
    read: TemplateRef<FamilyComponentHeaderTemplate>,
  })
  headerTemplate: TemplateRef<FamilyComponentHeaderTemplate> | null = null;

  constructor(private _familiesService: FamiliesService) {}

  ngOnInit() {
    console.log('!');
  }

  _deleteFamily() {
    this.family && this._familiesService.deleteFamily(this.family.lastName);
  }

  _handleHighlightChange(index: number) {
    const member = this.familyMembers?.toArray()[index];
    member?.highlight();
  }

  _handleButtonClicked(relativeIndex: number, index: number) {
    const member = this.familyMembers?.toArray()[index + relativeIndex];
    member?.highlight();
  }

  highlightAll() {
    for (const member of this.familyMembers?.toArray() || []) {
      member.highlight();
    }
  }

  protected _valueSum() {
    return this.family?.familyMembers.reduce((sum, member) => {
      if (member.value) {
        return sum + member.value;
      }
      return sum;
    }, 0);
  }
}
