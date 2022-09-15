import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor(private familiesService: FamiliesService) {}

  ngOnInit(): void {
    this.families = this.familiesService.families;

    this.familiesSub = this.familiesService.familiesObservable.subscribe(
      (family) => {
        console.log('family', family);
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
          console.log('member', newMember);
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
}
