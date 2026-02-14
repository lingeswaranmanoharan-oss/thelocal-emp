import { UserRole, UserStatus } from './enum';

export const USER_STATUS = {
  [UserStatus.ACTIVE]: 'Active',
  [UserStatus.INACTIVE]: 'Inactive',
};

export const USER_ROLE = {
  [UserRole.ADMIN]: { label: 'Admin', value: UserRole.ADMIN },
  [UserRole.USER]: { label: 'User', value: UserRole.USER },
};

export const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

export const icons = {
  employees: 'streamline-ultimate:human-resources-search-employees-bold',
  masters: 'hugeicons:menu-square',
  eyeIcon: 'lsicon:view-outline',
};
