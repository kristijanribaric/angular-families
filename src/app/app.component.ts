import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
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
  families: Record<string, Family> = {};
  // familyMembersSub: Subscription =
  //   this.familiesService.familiesObservable.subscribe();
  familiesSub?: Subscription;
  membersWithValuesSub?: Subscription;
  @ViewChildren(FamilyComponent)
  familiesComponents?: QueryList<FamilyComponent>;
  constructor(private familiesService: FamiliesService) {}

  ngOnInit(): void {
    this.families = this.familiesService.families;

    this.familiesSub = this.familiesService.familiesObservable.subscribe(
      (family) => {
        this.families[family.lastName] = family;
      },
      (error) => {
        console.log(error.message);
        this.familiesService.errorSubject.next(error.message);
      }
    );

    this.membersWithValuesSub =
      this.familiesService.membersWithValuesObservable.subscribe(
        (newMember: FamilyMemberBase) => {
          const familyMembers = this.families[newMember.lastName].familyMembers;
          const index = familyMembers.findIndex(
            (member) =>
              newMember.firstName === member.firstName &&
              newMember.lastName === member.lastName
          );
          if (index !== -1) {
            this.families[newMember.lastName].familyMembers[index] = newMember;
          }
        },
        (error) => {}
      );
  }

  ngOnDestroy() {
    this.familiesSub?.unsubscribe();
    this.membersWithValuesSub?.unsubscribe();
  }

  highlightAll() {
    for (const family of this.familiesComponents?.toArray() || []) {
      family.highlightAll();
    }
  }
}
