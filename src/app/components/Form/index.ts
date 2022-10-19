import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services';
// import { FamiliesService } from '../../services/FamiliesService';

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
  constructor(private _httpService: HttpService) {}

  ngOnInit(): void {
    this._errorSubscription = this._httpService.errorSubject.subscribe(
      (error) => {
        this._error = error;
      }
    );
  }
  _onSubmit() {
    const members = this._membersForm.value.members;
    console.log(members);
    if (members) {
      this._httpService.addFamily(members).subscribe({
        next: (families) => {
          for (const family of families) {
            this._httpService.families[family.lastName] = family;
          }
        },
        error: (error) => {
          console.log(error.message);
          this._httpService.errorSubject.next(error.message);
        },
      });
    }
    this._membersForm.reset();
  }

  ngOnDestroy() {
    this._errorSubscription?.unsubscribe();
  }
}
