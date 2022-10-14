import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FamiliesService } from '../../services/FamiliesService';

@Component({
  selector: 'app-form',
  templateUrl: './index.html',
  styleUrls: ['./style.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  _membersForm = new FormGroup({
    members: new FormControl(
      'Mr. Mario Mucalo, Mrs. Paola Gemić, Mrs. Ana Mucalo, Tonka Mucalo, Mr. Juraj Gemić, Lara Gemić, Toma Mucalo',
      [Validators.required]
    ),
  });

  _errorSubscription?: Subscription;
  _error: string | null = null;
  constructor(private _familiesService: FamiliesService) {}

  ngOnInit(): void {
    console.log(this._membersForm);
    this._errorSubscription = this._familiesService.errorSubject.subscribe(
      (error) => {
        this._error = error;
      }
    );
  }
  _onSubmit() {
    console.log(this._membersForm.value);
    const members = this._membersForm.value.members;

    if (members) {
      this._familiesService.addToFamily(members);
    }
    this._membersForm.reset();
  }

  ngOnDestroy() {
    this._errorSubscription?.unsubscribe();
  }
}
