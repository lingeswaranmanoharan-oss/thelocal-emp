import config from '../config/config';
import StorageService from '../services/storageService';

export const getClientStorage = () => {
  return JSON.parse(sessionStorage.getItem('loginCred'));
};
export const getAuthorization = (token) => {
  const jwt = token || getClientStorage()?.token || '';
  return jwt ? `Bearer ${jwt}` : null;
};

export const getAuthTokenDetails = (authToken) => {
  try {
    const token = authToken || StorageService.get(config.hrmToken);

    if (!token) return null;

    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));

    return payload;
  } catch (error) {
    console.error('Invalid token format:', error);
    return null;
  }
};
export const handleQueryParams = (params) => {
  for (const key in params) {
    if (!params[key] && params[key] !== 0) {
      delete params[key];
    }
  }
  const queryParams = new URLSearchParams({ ...params });
  return queryParams.toString();
};
// console.log(getAuthTokenDetails());
export const getEmpId = () => getAuthTokenDetails()?.sub;
export const getCompanyId = () => getAuthTokenDetails()?.company;
export const getDateToDDMMYYYYformat = (timezone, nullShow) => {
  let originalDate = new Date();
  if (timezone || nullShow) {
    if (nullShow && !timezone) {
      return '---';
    }
    originalDate = new Date(timezone);
  }
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, '0');
  const day = String(originalDate.getDate()).padStart(2, '0');

  return `${day}-${month}-${year}`;
};

export const getNameProfileIcon = (firstName = '', lastName = '') => {
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';

  return first + last; // 🔥 AD
};
