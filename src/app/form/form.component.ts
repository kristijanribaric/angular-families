import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FamiliesService } from '../services/families.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  membersForm = new FormGroup({
    members: new FormControl(''),
  });
  constructor(private familiesService: FamiliesService) {}

  onSubmit() {
    const members = this.membersForm.value.members
      ?.split(',')
      .map((m) => m.trim());

    if (members) {
      this.familiesService.addToFamily(members);
    }
    this.membersForm.reset();
  }
}
