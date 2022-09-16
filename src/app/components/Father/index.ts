import { Component, Input } from '@angular/core';
import { Father } from 'src/app/data';
import { FamilyMemberComponent } from '../FamilyMember';

@Component({
  selector: 'app-father',
  templateUrl: './index.html',
  styleUrls: ['./style.css', '../FamilyMember/style.css'],
})
export class FatherComponent extends FamilyMemberComponent {
  @Input() override member?: Father;
}
