export type FamilyMemberUpdateInputData = {
  lastName: string;
  firstName: string;
};

export type FamilyMemberUpdateOutputValues = {
  value: number;
};

export function updateFamilyMember(
  data: FamilyMemberUpdateInputData,
  callback: (data: FamilyMemberUpdateInputData) => void
) {
  setTimeout(() => {
    const lastName = data.lastName.toUpperCase();
    const firstName =
      lastName !== 'MUCALO' ? data.firstName : `${data.firstName} THE GREAT`;
    callback({ firstName, lastName });
  }, 50 + Math.random() * 50);
}

export function getFamilyMemberValues(
  data: FamilyMemberUpdateInputData,
  previousMemberValue: FamilyMemberUpdateOutputValues | null,
  callback: (data: FamilyMemberUpdateOutputValues) => void
) {
  setTimeout(() => {
    const input = `${data.firstName}:${data.lastName}:${
      previousMemberValue ? previousMemberValue.value : 0
    }`;
    const value =
      input.split('').reduce((val, c) => val + c.charCodeAt(0), 0) %
      input.length;
    callback({ value });
  }, 200 + Math.random() * 800);
}
