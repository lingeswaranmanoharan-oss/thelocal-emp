const baseUrl = import.meta.env.APP_API_URL;

const apiEndPoints = {
  getEmployeData: (employeeId) => `${baseUrl}/api-hrm/get/employee/details/id/${employeeId}`,
};

export default apiEndPoints;
