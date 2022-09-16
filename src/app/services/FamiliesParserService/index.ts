import { Injectable } from '@angular/core';
import { FamilyMemberBase, Family } from '../../data';
import {
  updateFamilyMemberWrapper,
  getFamilyMemberValuesWrapper,
} from './familyMemberUpdateWrapper';
import {
  Subject,
  tap,
  mergeMap,
  from,
  bindCallback,
  map,
  share,
  Observable,
  filter,
  distinctUntilChanged,
  distinct,
  concatMap,
} from 'rxjs';
import { customBuffer, takeWhenNotified } from '../../operators';

@Injectable({
  providedIn: 'root',
})
export class FamiliesParserService {
  private _familyMembersIndexDictionary: Record<string, string[]> = {};

  private _lastMemberDictionary: Record<string, number> = {};

  private _familyLastMemberDictionary: Record<string, FamilyMemberBase> = {};

  private membersWithValuesTrickleSignal: Subject<void> = new Subject();

  private privateFamilyMembersSubject: Subject<string[]> = new Subject();

  private privateFamilyMembersObservable = this.privateFamilyMembersSubject
    .pipe(mergeMap((members) => from(members)))
    .pipe(
      mergeMap((member) => {
        const familyMemberClass = Family.FamilyMembersTypes.find(
          (familyMember) => familyMember.checkIfMember(member)
        );
        if (!familyMemberClass) {
          throw new Error('Family member class not found');
        }
        const { firstName, lastName } =
          familyMemberClass.extractNameLastName(member);
        const family = this._familyMembersIndexDictionary[lastName];
        if (family) {
          family.push(member);
        } else {
          this._familyMembersIndexDictionary[lastName] = [member];
        }

        const memberIndex =
          this._familyMembersIndexDictionary[lastName].indexOf(member);

        const familyMemberObservable = bindCallback(updateFamilyMemberWrapper);
        return familyMemberObservable(
          { firstName, lastName },
          familyMemberClass,
          memberIndex
        );
      }),
      map((data) => {
        const member = {
          instance: new (data.memberClass as unknown as new (data: {
            firstName: string;
            lastName: string;
          }) => FamilyMemberBase)(data.memberData),
          index: data.index,
        };
        return member;
      }),
      share()
    );

  public familyMembersObservable: Observable<FamilyMemberBase> =
    this.privateFamilyMembersObservable.pipe(map((member) => member.instance));

  public familiesObservable: Observable<Family> =
    this.privateFamilyMembersObservable.pipe(
      customBuffer(
        this.privateFamilyMembersObservable.pipe(
          filter((member) => {
            const lastIndex =
              this._lastMemberDictionary[member.instance.lastName];
            if (lastIndex === undefined) {
              this._lastMemberDictionary[member.instance.lastName] = 0;
            }
            if (
              member.index ===
              this._lastMemberDictionary[member.instance.lastName]
            ) {
              return true;
            }
            return false;
          })
        )
      ),
      tap((family) => {
        this._lastMemberDictionary[family[0].lastName] = family.length;
      }),
      map((familyMembers) => {
        const family = new Family(familyMembers);
        return family;
      }),
      distinctUntilChanged(
        (a, b) =>
          a.lastName === b.lastName &&
          a.familyMembers.length === b.familyMembers.length
      ),
      share()
    );

  public membersWithValuesObservable: Observable<FamilyMemberBase> =
    this.familiesObservable
      .pipe(mergeMap((family) => family.familyMembers))
      .pipe(distinct())
      // .pipe(
      //   tap((m) => console.log("Got new ordered member:", m.toString()))
      // )
      .pipe(takeWhenNotified(this.membersWithValuesTrickleSignal, true))
      // .pipe(
      //   tap((m) => console.log("Got new buffered member:", m.toString()))
      // )
      .pipe(
        concatMap((familyMember) => {
          // Get last member
          const data = {
            firstName: familyMember.firstName,
            lastName: familyMember.lastName,
          };
          let lastMember: FamilyMemberBase | null = null;
          if (this._familyLastMemberDictionary[familyMember.lastName]) {
            lastMember =
              this._familyLastMemberDictionary[familyMember.lastName];
          }
          // Call async callback
          const familyMemberValuesObservable = bindCallback(
            getFamilyMemberValuesWrapper
          );
          return familyMemberValuesObservable(data, lastMember, familyMember);
        })
      )
      .pipe(
        map((values) => {
          values.familyMember.value = values.value;
          this._familyLastMemberDictionary[values.familyMember.lastName] =
            values.familyMember;
          return values.familyMember;
        })
      )
      // .pipe(
      //   tap((m) => console.log("Got new evaluated member:", m.toString()))
      // )
      .pipe(
        tap((m) => {
          // console.log("Sending notification signal!");
          this.membersWithValuesTrickleSignal.next();
        })
      );

  public parse(inputString: string): void {
    const memberString = inputString.split(',').map((member) => member.trim());
    this.privateFamilyMembersSubject.next(memberString);
    /*
        map((values) => {
          values.familyMember.value = values.value;
          this._familyLastMemberDictionary[values.familyMember.lastName] =
            values.familyMember;
          return values.familyMember;
        }),
c        tap((m) => console.log("Resolved value for: ", m.toString())),
        share(),
        tap((m) =>
          console.log("Resolved (after SHARE) value for: ", m.toString())
        )
      );
      */
  }
}
