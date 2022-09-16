import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FamilyMemberBase } from 'src/app/data';

@Component({
  selector: 'app-family-member',
  templateUrl: './index.html',
  styleUrls: ['./style.css'],
})
export class FamilyMemberComponent {
  @Input() index?: number;
  @Input() member?: FamilyMemberBase;
  @Output() highlightChange = new EventEmitter<number>();
  _highlight = false;

  constructor() {}

  get name() {
    return this.member?.toString();
  }

  highlight() {
    this._highlight = !this._highlight;
  }

  highlightNeighbor(neighborIndex: number) {
    this.highlightChange.emit(neighborIndex);
  }
}
