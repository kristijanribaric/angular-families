import { Component, Input } from '@angular/core';
import { Mother } from 'src/app/data';
import { FamilyMemberComponent } from '../FamilyMember';

@Component({
  selector: 'app-mother',
  templateUrl: './index.html',
  styleUrls: ['./style.css', '../FamilyMember/style.css'],
})
export class MotherComponent extends FamilyMemberComponent {
  @Input() override member?: Mother;
}
