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
import { FamilyMember, Family } from './data';
import { HttpService } from './services';
import { FamiliesService } from './services/FamiliesService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  _families = this.httpService.families;
  // familyMembersSub: Subscription =
  //   this.familiesService.familiesObservable.subscribe();
  _familiesSub?: Subscription;
  _membersWithValuesSub?: Subscription;
  @ViewChildren(FamilyComponent)
  _familiesComponents?: QueryList<FamilyComponent>;
  @ContentChild('') headerTemplate: TemplateRef<any> | null = null;
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this._familiesSub = this.httpService.getFamilies().subscribe({
      next: (families) => {
        for (const family of families) {
          this.httpService.families[family.lastName] = family;
        }
      },
      error: (error) => {
        console.log(error.message);
        this.httpService.errorSubject.next(error.message);
      },
    });

    // this._membersWithValuesSub =
    //   this.familiesService.membersWithValuesObservable.subscribe({
    //     next: (newMember: FamilyMemberBase) => {
    //       const familyMembers =
    //         this._families[newMember.lastName].familyMembers;
    //       const index = familyMembers.findIndex(
    //         (member) =>
    //           newMember.firstName === member.firstName &&
    //           newMember.lastName === member.lastName
    //       );
    //       if (index !== -1) {
    //         this._families[newMember.lastName].familyMembers[index] = newMember;
    //       }
    //     },
    //     error: (error) => {},
    //   });
  }

  ngOnDestroy() {
    this._familiesSub?.unsubscribe();
    // this._membersWithValuesSub?.unsubscribe();
  }

  highlightAll() {
    for (const family of this._familiesComponents?.toArray() || []) {
      family.highlightAll();
    }
  }
}
