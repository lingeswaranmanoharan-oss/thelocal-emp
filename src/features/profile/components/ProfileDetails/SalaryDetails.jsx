import { useCallback, useEffect, useReducer } from 'react';
import Accordion from '../../../../components/Accordion/Accordion';
import { apiStatusConditions, icons } from '../../../../utils/constants';
import { apiReducer, initialState } from '../../../../All-Services/apiReducer';
import { apiStatusConstants } from '../../../../utils/enum';
import { getEmployeeSalary } from '../../services/EmpService';
import { getEmpId } from '../../../../utils/function';
import Loader from '../../../../components/Loader/Loader';
import { ApiFailure } from '../../../../components/ApiFailure/ApiFailure';

const Row = ({
  label,
  value,
  className = '',
  labelClassName = '',
  valueClassName = '',
  rupeeNotReq,
}) => (
  <div className={`flex items-center justify-between border-b border-gray-100 py-2 ${className}`}>
    <span className={`text-gray-600 ${labelClassName}`}>{label}</span>
    <span className={`text-gray-800 font-medium ${valueClassName}`}>
      {!rupeeNotReq && '₹'}
      {value}
    </span>
  </div>
);
const SalaryDetails = () => {
  const [apiState, apiDispatch] = useReducer(apiReducer, initialState);

  const getSalaryDetails = useCallback(async () => {
    apiDispatch({
      apiStatus: apiStatusConstants.inProgress,
    });
    try {
      const response = await getEmployeeSalary(getEmpId());
      if (response?.success) {
        apiDispatch({
          apiStatus: apiStatusConstants.success,
          payload: response.data,
        });
      } else {
        apiDispatch({
          apiStatus: apiStatusConstants.failure,
          payload: response.data,
        });
      }
    } catch (err) {
      const message = err?.data?.error?.message;
      apiDispatch({
        apiStatus: apiStatusConstants.failure,
        payload: message,
      });
    }
  }, []);

  useEffect(() => {
    getSalaryDetails();
  }, []);

  const getContent = () => {
    if (apiStatusConditions.inProgress(apiState)) {
      return <Loader />;
    } else if (apiStatusConditions.failure(apiState)) {
      return <ApiFailure callBackFunction={getSalaryDetails} />;
    }
    const details = apiState?.data;

    return (
      <div className="bg-white w-full">
        <div className="flex items-start justify-between">
          <h2 className="text-sm tracking-widest text-gray-500 font-semibold">SALARY DETAILS</h2>

          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase">Total CTC</p>
            <p className="text-2xl font-semibold text-gray-800">₹ {details?.ctc}</p>
          </div>
        </div>

        <div className="gap-x-16 gap-y-5 text-sm">
          <Row label="Basic" value={details?.basic} />
          <Row label="HRA" value={details?.hra} />
          <Row label="Conveyance" value={details?.conveyance} />
          <Row label="LTA" value={details?.lta} />
          <Row label="Food Allowance" value={details?.food} />
          <Row
            label="Gross Salary"
            value={details?.gross}
            className="text-lg"
            labelClassName="font-medium"
          />
          <Row
            label="(-) Deductions"
            value=""
            rupeeNotReq
            className="text-[15px]"
            labelClassName="!text-gray-500 font-medium"
          />
          <Row label="Employee PF" value={details?.employeePf} />
          <Row label="Employee ESIC" value={details?.employerEsic} />
          <Row label="Professional Tax" value={details?.professionalTax} />
        </div>
        <Row
          label="Net Salary"
          value={details?.takeHomeSalary || 0}
          className="!border-b-0"
          labelClassName="!text-[var(--hrm-primary)]"
          valueClassName="!text-[var(--hrm-primary)]"
        />
      </div>
    );
  };

  return (
    <Accordion title="Salary" startIcon={icons.salary}>
      {getContent()}
    </Accordion>
  );
};

export default SalaryDetails;
