import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FamilyMember } from '../../data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-family-member',
  templateUrl: './index.html',
  styleUrls: ['./style.css'],
})
export class FamilyMemberComponent implements OnInit {
  // @Input() index?: number;
  @Input()
  public member?: FamilyMember;
  @Output()
  public highlightChange = new EventEmitter<number>();
  closeResult = '';
  protected _highlight = false;

  protected _memberForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl(0),
    type: new FormControl('', [Validators.required]),
  });

  constructor(
    private _modalService: NgbModal,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this._memberForm.patchValue({
      firstName: this._name,
      lastName: this._lastName,
      age: this._age,
      type: this._type,
    });
  }

  protected get _name() {
    return this.member?.firstName;
  }

  protected get _lastName() {
    return this.member?.lastName;
  }

  protected get _age() {
    return this.member?.age;
  }

  protected get _type() {
    return this.member?.type;
  }

  public highlight() {
    this._highlight = !this._highlight;
  }

  open(content: any) {
    this._modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed`;
        }
      );
  }

  protected _onSubmit() {
    const updatedMember = { ...this.member, ...this._memberForm.value };
    if (this._memberForm.valid) {
      this._httpService
        .updateFamilyMember(updatedMember as FamilyMember)
        .subscribe({
          next: (member) => {
            const foundMemberIndex = this._httpService.families[
              this.member!.lastName
            ].members.findIndex((member) => member.id === this.member!.id);
            if (foundMemberIndex === -1) return;
            if (member.lastName !== this.member!.lastName) {
              this._httpService.families[this.member!.lastName].members.splice(
                foundMemberIndex,
                1
              );
              this._httpService.families[member.lastName].members.push(member);
              return;
            }

            this._httpService.families[this.member!.lastName].members[
              foundMemberIndex
            ] = member;
          },
          error: (error) => {
            console.log(error.message);
          },
          complete: () => {
            this._modalService.dismissAll();
          },
        });
    }
  }

  protected _deleteMember() {
    this._httpService.deleteFamilyMember(this.member!).subscribe({
      next: () => {
        const foundMemberIndex = this._httpService.families[
          this.member!.lastName
        ].members.findIndex((member) => member.id === this.member!.id);
        if (foundMemberIndex !== -1) {
          this._httpService.families[this.member!.lastName].members.splice(
            foundMemberIndex,
            1
          );
        }
      },
      error: (error) => {
        console.error(error.message);
      },
      complete: () => {
        this._modalService.dismissAll();
      },
    });
  }
}
