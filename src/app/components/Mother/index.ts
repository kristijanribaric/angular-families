import { Component, Input } from '@angular/core';
import { FamilyMember } from '../../data';
import { FamilyMemberComponent } from '../FamilyMember';

@Component({
  selector: 'app-mother',
  templateUrl: './index.html',
  styleUrls: ['./style.css', '../FamilyMember/style.css'],
})
export class MotherComponent extends FamilyMemberComponent {}
