import {
  updateFamilyMember,
  FamilyMemberUpdateInputData,
  getFamilyMemberValues,
  FamilyMemberUpdateOutputValues,
} from './familyMemberUpdate';
import { FamilyMemberBase } from '../../data/Old/FamilyMembers';

export const updateFamilyMemberWrapper = (
  data: FamilyMemberUpdateInputData,
  memberClass: typeof FamilyMemberBase,
  index: number,
  callback: (data: {
    memberData: FamilyMemberUpdateInputData;
    memberClass: typeof FamilyMemberBase;
    index: number;
  }) => void
) => {
  updateFamilyMember(data, (data: FamilyMemberUpdateInputData) => {
    callback({ memberData: data, memberClass, index });
  });
};

export const getFamilyMemberValuesWrapper = (
  data: FamilyMemberUpdateInputData,
  previousMember: FamilyMemberBase | null,
  currentFamilyMember: FamilyMemberBase,
  callback: (data: { familyMember: FamilyMemberBase; value: number }) => void
) => {
  getFamilyMemberValues(
    data,
    previousMember ? { value: previousMember.value! } : null,
    (data: FamilyMemberUpdateOutputValues) => {
      callback({ familyMember: currentFamilyMember, value: data.value });
    }
  );
};
