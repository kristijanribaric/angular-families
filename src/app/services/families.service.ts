import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FamiliesService {
  families: Record<string, string[]> = {};

  constructor() {}

  addToFamily(members: string[]) {
    for (const member of members) {
      const lastMember = member.split(' ');
      const lastName = lastMember[lastMember.length - 1];
      const family = this.families[lastName];
      if (family) {
        family.push(member);
      } else {
        this.families[lastName] = [member];
      }
    }
  }

  deleteFamily(lastName: string) {
    delete this.families[lastName];
  }
}
