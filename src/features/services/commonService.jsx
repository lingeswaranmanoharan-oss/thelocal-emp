import HttpService from '../../services/httpService';
import { getCompanyId, handleQueryParams } from '../../utils/function';
export const imageUpload = async (data) => {
  const url = `/api-hrm/image`;
  const response = await HttpService.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
export const getDepartments = async (query) => {
  const url = `/api-hrm/v1/employee/department/get-all?${handleQueryParams(query)}`;
  const response = await HttpService.get(url);
  return response;
};
export const getEmploymentTypes = async (query) => {
  const url = `/api-hrm/v1/employee/get/all/employment-types?${handleQueryParams(query)}`;
  const response = await HttpService.get(url);
  return response;
};
export const getDesignations = async (companyId) => {
  // const url = `/api-hrm/v1/designation/getAll?${handleQueryParams(query)}`;
  const url = `/api-hrm/v1/employee/designation/company/${companyId}`;
  const response = await HttpService.get(url);
  return response;
};
