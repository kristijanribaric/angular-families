import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FamiliesService } from '../../services/FamiliesService';

@Component({
  selector: 'app-form',
  templateUrl: './index.html',
  styleUrls: ['./style.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  membersForm = new FormGroup({
    members: new FormControl(''),
  });

  errorSubscription?: Subscription;
  error: string | null = null;
  constructor(private familiesService: FamiliesService) {}

  ngOnInit(): void {
    this.errorSubscription = this.familiesService.errorSubject.subscribe(
      (error) => {
        this.error = error;
      }
    );
  }
  onSubmit() {
    const members = this.membersForm.value.members;

    if (members) {
      this.familiesService.addToFamily(members);
    }
    this.membersForm.reset();
  }

  ngOnDestroy() {
    this.errorSubscription?.unsubscribe();
  }
}
