import { useEffect, useReducer, useState } from 'react';
import './ViewEmployeeDetailsData.scss';
// import apiServices from '../../../../services/apiServices';
import { getDateToDDMMYYYYformat } from '../../../utils/function';
import useRouteInformation from '../../../Hooks/useRouteInformation';
import { apiStatusConstants } from '../../../utils/enum';
import toaster from '../../../services/toasterService';
// import { updateEmployeeApplicationStatus } from '../../services/services';
import { icons } from '../../../utils/constants';
import { Icon } from '@iconify/react';
import Popup from '../../../components/Popup/Popup';
import { TextField } from '@mui/material';

const tabs = [
  { id: 'personal?', label: 'Personal' },
  { id: 'addresses?', label: 'Address' },
  { id: 'passport?', label: 'Documents' },
  { id: 'education?', label: 'Education' },
  { id: 'employment?', label: 'Employment' },
  { id: 'experience?', label: 'Experience' },
  { id: 'dependency?', label: 'Bank Details' },
];

const ViewEmployeeDetailsData = ({ apiState }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [status, setStatus] = useState('');
  const { pathParams, pathname, navigate } = useRouteInformation();
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const handlePrevious = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const handleNext = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  // const getEmployeeDetailsData = () => {
  //   apiServices.getService({
  //     apiUrl: apiEndpoints.getEmployeeReqDetails(pathParams?.companyId),
  //     apiDispatch,
  //   });
  // };

  // useEffect(getEmployeeDetailsData, []);

  const renderDetailItem = (label, value, fullWidth = false) => (
    <div className={`detail-item ${fullWidth ? 'full-width' : ''}`}>
      <div className="detail-label">{label}</div>
      <div className={`detail-value ${!value ? 'empty' : ''}`}>{value || 'Not provided'}</div>
    </div>
  );
  const SectionHeader = ({ title, onEdit, profileUpdatedFlag }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        borderBottom: '2px solid #e9ecef',
        // bo: "2px solid #e9ecef";
      }}
    >
      <h2 className="section-title" style={{ marginBottom: 0 }}>
        {title}
      </h2>

      {onEdit && profileUpdatedFlag !== 'Y' && (
        <button
          onClick={onEdit}
          style={{
            border: '1px solid #dee2e6',
            padding: '6px 14px',
            borderRadius: '6px',
            background: '#fff',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          ✏ Edit
        </button>
      )}
    </div>
  );

  const renderPersonalDetails = () => {
    return (
      <div>
        {' '}
        {apiState?.reportedReason && (
          <>
            {' '}
            <h2 className="section-title" style={{ marginRight: '20px' }}>
              Report Reason{' '}
              <span
                style={{
                  textAlign: 'start',
                  color: '#dc2626',
                  fontSize: '14px',
                  fontWeight: '400',
                  marginLeft: '20px',
                  // margin: '0px',
                }}
              >
                {apiState?.reportedReason}
              </span>
            </h2>
            {/* <hr className="my-3 border-gray-200" /> */}
          </>
        )}
        <SectionHeader
          title="Personal Details"
          profileUpdatedFlag={apiState?.profileUpdatedFlag}
          onEdit={() => {
            navigate('/Edit-emp');
          }}
        />
        {/* <h2 className="section-title">Personal Details</h2> */}
        <div style={{ display: 'flex' }}>
          <div className="details-grid w-[100%]">
            {renderDetailItem('First Name', apiState?.firstName)}
            {renderDetailItem('Last Name', apiState?.lastName)}
            {renderDetailItem('Date of Birth', getDateToDDMMYYYYformat(apiState?.dob))}
            {renderDetailItem('Gender', apiState?.gender)}
            {renderDetailItem('Marital Status', apiState?.maritalStatus)}
            {renderDetailItem('Blood Group', apiState?.bloodGroup)}
            {renderDetailItem('Personal Email', apiState?.personalEmail)}
            {renderDetailItem('Mobile Number', apiState?.contactNumber)}
          </div>
          <div style={{ display: 'flex', alignItems: 'start', width: '50%' }}>
            <img
              src={apiState?.profileUrl || 'https://placehold.co/600x400?text=No%20image'}
              alt="profile"
              style={{
                height: '150px',
                objectFit: 'cover',
                width: '150px',
                borderRadius: '50%',
              }}
            />
          </div>
        </div>
        <h2 className="section-title">Family Details</h2>
        {apiState?.familyDetails.length !== 0 ? (
          apiState?.familyDetails?.map((each, index, arr) => {
            return (
              <>
                <div className="details-grid">
                  {renderDetailItem('Relation', each?.relationType)}
                  {renderDetailItem('Date of Birth', getDateToDDMMYYYYformat(each?.dob))}

                  {renderDetailItem('Contact Number', each?.contactNumber)}
                  {/* {renderDetailItem('E-mail', each?.emailId)} */}
                  {renderDetailItem('Occupation', each?.occupation)}
                  {renderDetailItem('Aadhar Number', each?.aadharNumber)}
                  {renderDetailItem(
                    'Aadhar Document',
                    <button
                      onClick={() => window.open(each.aadharUrl, '_blank')}
                      className="flex items-center gap-2 text-black-600 hover:text-black-800"
                    >
                      <Icon icon={icons.eyeIcon} />
                      <span className="text-sm">View Document</span>
                    </button>,
                  )}
                </div>
                {index !== arr.length - 1 && <hr className="my-3 border-gray-200" />}
              </>
            );
          })
        ) : (
          <p style={{ textAlign: 'center', color: '#adb5bd' }}>Not Provided</p>
        )}
      </div>
    );
  };
  const currentAddress = apiState?.addresses?.find((item) => item.addressType === 'CURRENT');

  const permanentAddress = apiState?.addresses?.find((item) => item.addressType === 'PERMANENT');

  const renderAddressBlock = (data) => {
    if (!data) return null;

    return (
      <div className="details-grid">
        {renderDetailItem('Flat / House No. / Building', data?.doorNum)}
        {renderDetailItem('Landmark', data?.landMark)}
        {renderDetailItem('Area / Street / Sector / Village', data?.areaDetails)}
        {renderDetailItem('City', data?.city)}
        {renderDetailItem('State', data?.state)}
        {renderDetailItem('Pincode', data?.pinCode)}
        {renderDetailItem('Country', data?.country)}
      </div>
    );
  };
  const renderAddressDetails = () => (
    <div>
      <SectionHeader
        title="Current Address"
        profileUpdatedFlag={apiState?.profileUpdatedFlag}
        onEdit={() => {
          navigate('/Edit-emp');
        }}
      />
      {currentAddress || permanentAddress ? (
        <>
          {renderAddressBlock(currentAddress)}
          <SectionHeader title="Permanent Address" />
          {renderAddressBlock(permanentAddress)}
        </>
      ) : (
        <p style={{ textAlign: 'center', color: '#adb5bd' }}>Not Provided</p>
      )}
    </div>
  );

  const renderPassportDetails = () => (
    <div>
      {/* <h2 className="section-title">Documents Details</h2> */}
      <SectionHeader
        title="Documents Details"
        profileUpdatedFlag={apiState?.profileUpdatedFlag}
        onEdit={() => {
          navigate('/Edit-emp');
        }}
      />
      {apiState?.documents?.length > 0 ? (
        apiState?.documents.map((each) => {
          return (
            <div className="details-grid">
              {renderDetailItem('Document Name', each?.documentName)}
              {renderDetailItem('Document Number', each?.documentNumber)}
              {renderDetailItem(
                'Document Image',
                <button
                  onClick={() => window.open(each?.documentUrl, '_blank')}
                  className="flex items-center gap-2 text-black-600 hover:text-black-800"
                >
                  <Icon icon={icons.eyeIcon} />
                  <span className="text-sm">View Document</span>
                </button>,
              )}
            </div>
          );
        })
      ) : (
        <p style={{ textAlign: 'center', color: '#adb5bd' }}>Not Provided</p>
      )}
    </div>
  );

  const renderAcademicDetails = () => (
    <div>
      {/* <h2 className="section-title">Education Details</h2> */}
      <SectionHeader
        title="Education Details"
        profileUpdatedFlag={apiState?.profileUpdatedFlag}
        onEdit={() => {
          navigate('/Edit-emp');
        }}
      />
      {apiState?.employeeEducation?.length > 0 ? (
        apiState?.employeeEducation?.map((each, index, arr) => {
          return (
            <>
              <div className="details-grid mt-5">
                {renderDetailItem('Qualification', each?.qualificationLevel)}
                {renderDetailItem('Specialization', each?.specialization)}
                {renderDetailItem('University', each?.universityName)}
                {renderDetailItem('Institute Name', each?.institutionName)}
                {renderDetailItem('Degree Name', each?.degreeName)}
                {renderDetailItem('Start Year', each?.startYear)}
                {renderDetailItem('End Year', each?.endYear)}
                {renderDetailItem('Year of Passing', each?.completionYear)}
                {renderDetailItem('Percentage', each?.gradeOrPercentage)}
                {renderDetailItem(
                  'Certificate',
                  <button
                    onClick={() => window.open(each.educationDocumentUrl, '_blank')}
                    className="flex items-center gap-2 text-black-600 hover:text-black-800"
                  >
                    <Icon icon={icons.eyeIcon} />
                    <span className="text-sm">View Document</span>
                  </button>,
                )}{' '}
              </div>
              {index !== arr.length - 1 && <hr className="my-3 border-gray-200" />}
            </>
          );
        })
      ) : (
        <p style={{ textAlign: 'center', color: '#adb5bd' }}>Not Provided</p>
      )}
    </div>
  );

  const renderEmploymentDetails = () => (
    <div>
      {/* <h2 className="section-title">Employment Details</h2> */}
      <SectionHeader
        title="Employment Details"
        profileUpdatedFlag={apiState?.profileUpdatedFlag}
        onEdit={() => {
          navigate('/Edit-emp');
        }}
      />
      <div className="details-grid">
        {renderDetailItem('Employment Type', apiState?.employmentTypeName)}
        {renderDetailItem('Designation', apiState?.designationName)}
        {renderDetailItem('Department', apiState?.departmentName)}
        {renderDetailItem('Joining Date', apiState?.doj)}
        {/* {renderDetailItem('Previous Company', apiState?.previousCompany, true)} */}
      </div>
    </div>
  );

  const renderExperienceDetails = () => (
    <div>
      {/* <h2 className="section-title">Experience Details</h2> */}
      <SectionHeader
        profileUpdatedFlag={apiState?.profileUpdatedFlag}
        title="Experience Details"
        onEdit={() => {
          navigate('/Edit-emp');
        }}
      />
      {apiState?.experiences?.length > 0 ? (
        apiState?.experiences.map((each) => {
          return (
            <>
              <div className="details-grid">
                {renderDetailItem('Total Experience', each?.totalExperience)}
                {renderDetailItem('Company Name', each?.companyName)}
                {renderDetailItem(
                  'Experience Document',
                  <button
                    onClick={() => window.open(each.experienceUrl, '_blank')}
                    className="flex items-center gap-2 text-black-600 hover:text-black-800"
                  >
                    <Icon icon={icons.eyeIcon} />
                    <span className="text-sm">View Document</span>
                  </button>,
                )}{' '}
                {renderDetailItem(
                  'Releaving Document',
                  <button
                    onClick={() => window.open(each.relivingUrl, '_blank')}
                    className="flex items-center gap-2 text-black-600 hover:text-black-800"
                  >
                    <Icon icon={icons.eyeIcon} />
                    <span className="text-sm">View Document</span>
                  </button>,
                )}{' '}
                {renderDetailItem(
                  'Payslip Document',
                  <button
                    onClick={() => window.open(each.paySlipUrl, '_blank')}
                    className="flex items-center gap-2 text-black-600 hover:text-black-800"
                  >
                    <Icon icon={icons.eyeIcon} />
                    <span className="text-sm">View Document</span>
                  </button>,
                )}
                {renderDetailItem(
                  'Bank Statement',
                  <button
                    onClick={() => window.open(each.bankStatementUrl, '_blank')}
                    className="flex items-center gap-2 text-black-600 hover:text-black-800"
                  >
                    <Icon icon={icons.eyeIcon} />
                    <span className="text-sm">View Document</span>
                  </button>,
                )}
              </div>
            </>
          );
        })
      ) : (
        <p style={{ textAlign: 'center', color: '#adb5bd' }}>Not Provided</p>
      )}
    </div>
  );

  const renderDependencyDetails = () => (
    <div>
      {/* <h3 className="section-title" style={{ marginTop: '0px' }}>
        Bank Details
      </h3> */}
      <SectionHeader
        title="Bank Details"
        profileUpdatedFlag={apiState?.profileUpdatedFlag}
        onEdit={() => {
          navigate('/Edit-emp');
        }}
      />
      <div className="details-grid">
        {renderDetailItem('Account Holder Name', apiState?.bankAccHolderName)}
        {renderDetailItem('Bank Name', apiState?.bankName)}
        {renderDetailItem('Account Number', apiState?.bankAccNum)}
        {renderDetailItem('IFSC Code', apiState?.ifscCode)}
        {renderDetailItem('Branch', apiState?.bankBranch, true)}
      </div>
      <SectionHeader title="Statutory Details" />
      <div className="details-grid">
        {renderDetailItem('UAN Number', apiState?.uanNumber)}
        {renderDetailItem('ESI Number', apiState?.esiNumber)}
      </div>
      {pathname.includes('requested') && (
        <div className="action-buttons">
          <button
            className="btn btn-approve"
            onClick={() => {
              setConfirmPopup(true);
              setStatus('approve');
            }}
          >
            ✓ Approve Application
          </button>
          <button
            className="btn btn-reject"
            onClick={() => {
              setConfirmPopup(true);
              setStatus('report');
            }}
          >
            ✗ Report Application
          </button>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return renderPersonalDetails();
      case 1:
        return renderAddressDetails();
      case 2:
        return renderPassportDetails();
      case 3:
        return renderAcademicDetails();
      case 4:
        return renderEmploymentDetails();
      case 5:
        return renderExperienceDetails();
      case 6:
        return renderDependencyDetails();
      default:
        return null;
    }
  };

  const onSubmit = async (data) => {
    // setApiStatus(apiStatusConstants.inProgress);
    // try {
    //   const response = await updateEmployeeApplicationStatus(data);
    //   if (response.success === true) {
    //     setApiStatus(apiStatusConstants.success);
    //     toaster.success(response.message);
    //     setConfirmPopup(false);
    //     navigate(status === 'report' ? '/employees/reported' : '/employees/approved');
    //   } else {
    //     setApiStatus(apiStatusConstants.failure);
    //     toaster.error(response.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   setApiStatus(apiStatusConstants.failure);
    //   toaster.error(error?.response?.data?.error);
    // }
  };
  const [reason, setReason] = useState('');

  return (
    <div
      className="container overflow-y-auto h-screen"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        scrollbarWidth: 'none',
      }}
    >
      <div
        className="header"
        style={{
          padding: '10px',
          borderRadius: '5px 5px 0px 0px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <h2>View Application Details</h2>
        <p> * Review all Information before taking Action</p>
      </div>

      <div
        className="tabs-container"
        style={{
          position: 'sticky',
          top: 65,
          zIndex: 50,
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="content">
        {renderContent()}

        {activeTab !== 6 && (
          <div className="button-group">
            <button
              className="btn btn-previous"
              onClick={handlePrevious}
              disabled={activeTab === 0}
            >
              ← Previous
            </button>
            <button
              className="btn btn-next"
              onClick={handleNext}
              disabled={activeTab === tabs.length - 1}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {confirmPopup && (
        <Popup open={confirmPopup} onClose={setConfirmPopup} header={'Confirmation'}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="flex flex-col gap-4 p-5 w-full max-w-lg  ">
              {/* Title */}
              <p className="text-gray-700 text-center font-medium">
                Are you sure you want to {status} status?
              </p>

              {/* Reason Field */}
              {status === 'report' && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-600">Reason</label>

                  <textarea
                    rows={4}
                    placeholder="Enter reason..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="
              w-full
              border border-gray-300
              rounded-lg
              p-3
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-red-400
              resize-none
            "
                  />
                </div>
              )}

              {/* Button */}
              <div className="flex justify-end">
                <button
                  onClick={() =>
                    onSubmit({
                      id: pathParams.companyId,
                      employeeApplicationStatus: status === 'report' ? 'REPORTED' : 'APPROVED',
                      rejectedReason: reason,
                    })
                  }
                  disabled={status === 'report' && !reason.trim()}
                  className={`
            px-5 py-2
            rounded-lg
            text-white
            font-medium
            transition
            ${
              status === 'report'
                ? 'bg-red-500 hover:bg-red-600 disabled:bg-red-300'
                : 'bg-green-600 hover:bg-green-700'
            }
          `}
                >
                  {status === 'report' ? 'Report' : 'Approve'}
                </button>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};
export default ViewEmployeeDetailsData;
