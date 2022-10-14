import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FamilyComponent } from './components';
import { FamilyMemberBase, Family } from './data';
import { FamiliesService } from './services/FamiliesService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  _families: Record<string, Family> = {};
  // familyMembersSub: Subscription =
  //   this.familiesService.familiesObservable.subscribe();
  _familiesSub?: Subscription;
  _membersWithValuesSub?: Subscription;
  @ViewChildren(FamilyComponent)
  _familiesComponents?: QueryList<FamilyComponent>;
  @ContentChild('') headerTemplate: TemplateRef<any> | null = null;
  constructor(private familiesService: FamiliesService) {}

  ngOnInit(): void {
    this._families = this.familiesService.families;

    this._familiesSub = this.familiesService.familiesObservable.subscribe({
      next: (family) => {
        this._families[family.lastName] = family;
      },
      error: (error) => {
        console.log(error.message);
        this.familiesService.errorSubject.next(error.message);
      },
    });

    this._membersWithValuesSub =
      this.familiesService.membersWithValuesObservable.subscribe({
        next: (newMember: FamilyMemberBase) => {
          const familyMembers =
            this._families[newMember.lastName].familyMembers;
          const index = familyMembers.findIndex(
            (member) =>
              newMember.firstName === member.firstName &&
              newMember.lastName === member.lastName
          );
          if (index !== -1) {
            this._families[newMember.lastName].familyMembers[index] = newMember;
          }
        },
        error: (error) => {},
      });
  }

  ngOnDestroy() {
    this._familiesSub?.unsubscribe();
    this._membersWithValuesSub?.unsubscribe();
  }

  highlightAll() {
    for (const family of this._familiesComponents?.toArray() || []) {
      family.highlightAll();
    }
  }
}
