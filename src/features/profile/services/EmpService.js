import HttpService from '../../../services/httpService';
import { handleQueryParams } from '../../../utils/function';

export const getEmpById = async (id) => {
  const url = `/api-hrm/v1/get/employee/details/id/${id}`;
  const response = await HttpService.get(url);
  return response;
};
export const putEmpData = async (id, data) => {
  const url = `/api-hrm/v1/employee/update/id/${id}`;
  const response = await HttpService.put(url, data);
  return response;
};
