import {
  Directive,
  Component,
  Input,
  QueryList,
  ViewChildren,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { Family } from '../../data';
import { HttpService } from 'src/app/services';
// import { FamiliesService } from '../../services/FamiliesService';
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

  constructor(private _httpService: HttpService) {}

  ngOnInit() {}

  _deleteFamily() {
    this.family &&
      this._httpService.deleteFamily(this.family.lastName).subscribe({
        next: () => {
          delete this._httpService.families[this.family!.lastName];
        },
      });
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
    return this.family?.members.reduce((sum, member) => {
      if (member.age) {
        return sum + member.age;
      }
      return sum;
    }, 0);
  }
}
