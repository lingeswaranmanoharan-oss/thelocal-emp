import { getAccessToken } from '../services/httpService';
import { apiStatusConstants } from './enum';

export const getClientStorage = () => {
  return JSON.parse(sessionStorage.getItem('loginCred'));
};
export const getAuthorization = (token) => {
  const jwt = token || getClientStorage()?.token || '';
  return jwt ? `Bearer ${jwt}` : null;
};

export const getAuthTokenDetails = (authToken) => {
  try {
    const token = authToken || getAccessToken();

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

export const initialState = {
  apiStatus: apiStatusConstants.initial,
};

export const apiReducer = (state = initialState, action) => {
  switch (action.apiStatus) {
    case apiStatusConstants.success:
      return {
        apiStatus: apiStatusConstants.success,
        data: action.payload,
      };
    case apiStatusConstants.failure:
      return {
        ...state,
        apiStatus: apiStatusConstants.failure,
        data: action.payload,
      };
    case apiStatusConstants.inProgress:
      return {
        ...state,
        apiStatus: apiStatusConstants.inProgress,
      };
    case apiStatusConstants.initial:
      return {
        apiStatus: apiStatusConstants.initial,
      };
    // direct update within modal(api-response)
    default:
      return {
        ...state,
        data: {
          ...state.data,
          data: { ...state.data.data, ...action },
        },
      };
  }
};

export const formatAmountToFixed = (val) => {
  const num = Number(val);
  return val == null ? '' : num.toFixed(2);
};

export const formatLabelWithSpaces = (string) => {
  if (!string) return '';
  return string.replace(/[_-]+/g, ' ').trim();
};