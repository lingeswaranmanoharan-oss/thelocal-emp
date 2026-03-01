import { useEffect, useMemo, useReducer } from 'react';
import apiServices from '../../All-Services/apiServices';
import { apiReducer, getCompanyId, getDateToDDMMYYYYformat, initialState } from '../../utils/function';
import dayjs from 'dayjs';
import apiEndPoints from '../../All-Services/apiEndPoints';
import useRouteInformation from '../../hooks/useRouteInformation';
import { TableComponent, TableRow } from '../../components/Table/Table';
import DateInput from '../../components/DateInput/DateInput';

const Holidays = () => {
  const [apiState, apiDispatch] = useReducer(apiReducer, initialState);

  const { queryParams, setQueryParams } = useRouteInformation();

  const fetchHolidays = async () => {
    apiServices.getService({
      apiUrl: apiEndPoints.getHolidays(getCompanyId(), {
        year: queryParams?.year || dayjs().year(),
      }),
      apiDispatch,
    });
  };

  console.log(getCompanyId());

  const handleYearChange = (date, year) => {
    console.log(date, year);
    setQueryParams({ year: Number(year) });
  };




 // console.log(apiState);

  useEffect(() => {
    if (!queryParams?.year) {
      setQueryParams({ year: dayjs().year() });
      return;
    }

    fetchHolidays();
  }, [queryParams?.year]);



  const renderedRows = useMemo(() => {
    if (!Array.isArray(apiState?.data?.data)) return null;

    const orderedRows = [...apiState?.data.data].sort(
      (a, b) => new Date(a.holidayDate) - new Date(b.holidayDate),
    );
    

    return orderedRows?.map((item) =>{ 
     return <TableRow
        key={item.id}
        elements={[
          item.holidayName,
          getDateToDDMMYYYYformat(item.holidayDate),
          item.weekdayName,
         <span className={`px-4 py-2 rounded-2xl ${!item.optionalFlag?' bg-orange-400':'bg-gray-400'} `}>{ `${item.optionalFlag ? 'Optional' : 'Mandatory'}`}</span>
        ]}
      />
    });
  }, [apiState.data?.data]);



  return (
    <div className="bg-white border rounded-sm flex flex-col items-end">
      <div className="w-full flex justify-between p-3">
        <DateInput
          label="Select Year"
          format="YYYY"
          value={queryParams?.year} // important
          handleChange={handleYearChange}
          views={['year']}
          maxDate={dayjs()}
        />
      </div>

      <TableComponent
        headers={['Title', 'Date', 'Day', 'Type']}
        apiStatus={apiState.apiStatus}
        itemsLength={apiState?.data?.data?.length}
        colSpan={4}
        containerStyle={{ maxHeight: '70vh', scrollbarWidth: 'none' }}
      >
        {renderedRows}
      </TableComponent>
    </div>
  );
};

export default Holidays;
