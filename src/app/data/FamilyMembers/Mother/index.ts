import { FamilyMemberBase } from '../FamilyMemberBase';
import { Family } from '../../Family';

export class Mother extends FamilyMemberBase {
  static override checkIfMember = (memberString: string) => {
    return /^Mrs\.\s+[A-Z]([a-z]|[^\x00-\x7F])+\s+[A-Z]([a-z]|[^\x00-\x7F])+$/.test(
      memberString.trim()
    );
  };

  static override extractNameLastName = (
    personString: string
  ): { firstName: string; lastName: string } => {
    const name = personString.trim().split(' ').splice(1).join(' ');
    const [firstName, lastName] = name.split(' ');
    return { firstName, lastName };
  };

  constructor(data: { firstName: string; lastName: string }) {
    super(data);
  }

  public override toString(): string {
    if (this._value !== null && typeof this._value !== 'undefined')
      return `${this.firstName} (${this._value})`;
    return `${this.firstName}`;
  }
}

Family.FamilyMembersTypes.push(Mother);
