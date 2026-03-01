import apiEndPoints from '../../../All-Services/apiEndPoints';
import HttpService from '../../../services/httpService';
import { getCompanyId } from '../../../utils/function';

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
export const getEmployeeSalary = async (employeeId) => {
  const response = await HttpService.get(apiEndPoints.getEmployeeSalary(employeeId));
  return response;
};
export const addEmployeeSalary = async (data) => {
  const response = await HttpService.post(apiEndPoints.addEmployeeSalary, {
    ...data,
    companyId: getCompanyId(),
  });
  return response;
};
export const getGeneratePayslip = async({companyId, employeeId, month, year}) => {
  const response = await HttpService.get(apiEndPoints.generatePayslip(companyId, employeeId, month, year));
  return response;
}
