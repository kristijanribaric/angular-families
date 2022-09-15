import { FamilyMemberBase } from '../FamilyMembers';

export class Family {
  public lastName: string;
  familyMembers: FamilyMemberBase[] = [];

  // static array of all family members
  static FamilyMembersTypes: typeof FamilyMemberBase[] = [];

  constructor(family: FamilyMemberBase[]) {
    this.familyMembers = family;
    const firstMember = family[0].lastName;
    this.lastName = firstMember;
  }

  checkIfFamilyMember(member: FamilyMemberBase) {
    return member.lastName === this.lastName;
  }

  addFamilyMember(member: FamilyMemberBase) {
    this.familyMembers.push(member);
  }

  updateFamilyMember(member: FamilyMemberBase) {
    const index = this.familyMembers.findIndex(
      (familyMember) =>
        familyMember.firstName === member.firstName &&
        familyMember.lastName === member.lastName
    );
    this.familyMembers[index] = member;
  }

  toStringMembers() {
    return `Family ${this.lastName} has ${
      this.familyMembers.length
    } members: ${this.familyMembers.map((member) => member.toString())}`;
  }

  toStringNew() {
    let valuesSum = 0;
    // hashmap of all family members
    const familyMembers: Record<string, FamilyMemberBase[]> = {};
    // loop through family members and add them to hashmap
    for (const member of this.familyMembers) {
      if (!familyMembers[member.constructor.name]) {
        familyMembers[member.constructor.name] = [];
      }
      familyMembers[member.constructor.name].push(member);
      valuesSum += member.value;
    }

    // loop through hashmap and create string for each type of family member
    const familyString = Object.keys(familyMembers)
      .map((type) => {
        const members = familyMembers[type];
        return `${type} [${members.length}]: ${members.map((member) =>
          member.toString()
        )}`;
      })
      .join(', ');

    return `In the ${this.lastName} (${valuesSum}) family members: ${familyString}`;
  }
}
