export abstract class FamilyMemberBase {
  static checkIfMember: (memberString: string) => boolean;
  static extractNameLastName: (personString: string) => {
    firstName: string;
    lastName: string;
  };

  private _firstName: string;
  private _lastName: string;
  protected _value?: number;

  constructor(data: { firstName: string; lastName: string }) {
    this._firstName = data.firstName;
    this._lastName = data.lastName;
  }

  set value(value: number) {
    this._value = value;
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get value() {
    if (this._value === undefined) throw new Error("Value is not set");
    return this._value;
  }
  public toString(): string {
    throw new Error("Method not implemented.");
  }
}
