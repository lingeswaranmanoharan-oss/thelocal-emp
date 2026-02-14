import { useForm } from 'react-hook-form';
import { Input } from '../../components/Input/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { getEmpById } from '../../features/profile/services/EmpService';
import { getEmpId } from '../../utils/function';
import toaster from '../../services/toasterService';
import ViewEmployeeDetailsData from './ViewEmployeeDetailsData/ViewEmployeeDetailsData';
import { Icon } from '@iconify/react';

const Employee = () => {
  const [empData, setEmpData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const[fo]
  useEffect(() => {
    const fetchCompanyData = async () => {
      setIsLoading(true);
      try {
        const response = await getEmpById(getEmpId());
        if (response && response.success && response.data) {
          setEmpData(response.data);
          // fillFormFromApi(response.data);
        }
      } catch (error) {
        if (error.response) {
          const { message } = error.response.data?.error || {};
          toaster.error(message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, []);
  console.log(empData);
  const fullName = empData ? `${empData.firstName ?? ''} ${empData.lastName ?? ''}` : '';

  return (
    <div className="bg-white p-4">
      {/* <div className="text-lg font-semibold mb-2">Welcome {fullName}</div> */}
      <div className="flex items-center gap-2 text-lg font-semibold mb-2">
        <Icon icon="mdi:hand-wave-outline" className="text-orange-500 text-xl" />
        <span>
          Welcome {fullName} {empData?.employeeId && `(${empData?.employeeId})`}
        </span>
      </div>

      <ViewEmployeeDetailsData apiState={empData} />
    </div>
  );
};

export default Employee;
