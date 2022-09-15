import { Injectable } from '@angular/core';
import { FamiliesParserService } from '../FamiliesParserService';
import { Family } from '../../data';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FamiliesService {
  families: Record<string, Family> = {};
  errorSubject = new Subject<string>();
  familyMembersObservable = this.familiesParserService.familyMembersObservable;
  familiesObservable = this.familiesParserService.familiesObservable;
  membersWithValuesObservable =
    this.familiesParserService.membersWithValuesObservable;
  constructor(private familiesParserService: FamiliesParserService) {}

  addToFamily(members: string) {
    this.familiesParserService.parse(members);
  }

  deleteFamily(lastName: string) {
    delete this.families[lastName];
  }
}
