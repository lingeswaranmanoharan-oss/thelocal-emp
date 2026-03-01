import { handleQueryParams } from "../utils/function";

const apiEndPoints = {
  getEmployeData: (employeeId) => `/api-hrm/get/employee/details/id/${employeeId}`,
  getEmployeeSalary: (employeeId) => `/api-hrm/v1/salary/employee/${employeeId}`,
  addEmployeeSalary: `/v1/salary`,
  getHolidays:(companyId,query)=>`/api-hrm/v1/calendars/companyId/${companyId}?${handleQueryParams(query)}`,
  generatePayslip: (companyId, employeeId, month, year) => `/api-hrm/payslip/companyId/${companyId}/employeeId/${employeeId}/month/${month}/year/${year}`,
};

export default apiEndPoints;
