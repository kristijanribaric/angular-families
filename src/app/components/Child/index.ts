import { Component, Input } from '@angular/core';
import { Child } from 'src/app/data';
import { FamilyMemberComponent } from '../FamilyMember';

@Component({
  selector: 'app-child',
  templateUrl: './index.html',
  styleUrls: ['./style.css', '../FamilyMember/style.css'],
})
export class ChildComponent extends FamilyMemberComponent {
  @Input() override member?: Child;
}
