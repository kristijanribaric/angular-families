import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FamilyMemberBase } from 'src/app/data';

@Component({
  selector: 'app-family-member',
  templateUrl: './index.html',
  styleUrls: ['./style.css'],
})
export class FamilyMemberComponent {
  // @Input() index?: number;
  @Input()
  public member?: FamilyMemberBase;
  @Output()
  public highlightChange = new EventEmitter<number>();

  protected _highlight = false;

  constructor() {}

  protected get _name() {
    return this.member?.toString();
  }

  public highlight() {
    this._highlight = !this._highlight;
  }

  // _highlightNeighbor(neighborIndex: number) {
  //   this.highlightChange.emit(neighborIndex);
  // }
}
