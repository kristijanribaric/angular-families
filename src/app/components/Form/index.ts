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

  _errorSubscription?: Subscription;
  _error: string | null = null;
  constructor(private _familiesService: FamiliesService) {}

  ngOnInit(): void {
    this._errorSubscription = this._familiesService.errorSubject.subscribe(
      (error) => {
        this._error = error;
      }
    );
  }
  _onSubmit() {
    const members = this.membersForm.value.members;

    if (members) {
      this._familiesService.addToFamily(members);
    }
    this.membersForm.reset();
  }

  ngOnDestroy() {
    this._errorSubscription?.unsubscribe();
  }
}
