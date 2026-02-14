import { apiStatusConstants } from '../utils/constants';
import apiInstance from './apiInstance';

const getContentDisposition = (response) => {
  const contentDis = response.headers['content-disposition']
    .replace('attachment;', '')
    .replace(' filename=', '');
  const file = new File([response.data], contentDis, {
    type: response.data.type,
  });

  return file;
};

const handleErrors = ({ response, apiDispatch, callBackFunction, responseType }) => {
  if ([200, 201].includes(response.status)) {
    if (response.data.success) {
      callBackFunction && callBackFunction(response.data);
      apiDispatch &&
        apiDispatch({
          apiStatus: apiStatusConstants.success,
          payload: response.data,
        });
    } else {
      apiDispatch &&
        apiDispatch({
          apiStatus: apiStatusConstants.failure,
          payload: responseType === 'blob' ? getContentDisposition(response) : response.data,
        });
      callBackFunction &&
        callBackFunction(responseType === 'blob' ? getContentDisposition(response) : response.data);
    }
  } else {
    callBackFunction && callBackFunction(response.data);
    apiDispatch({
      apiStatus: apiStatusConstants.failure,
      payload: response.data,
    });
  }
};

const apiServices = {
  getService: async ({ apiUrl, apiDispatch, callBackFunction, controller, responseType, type }) => {
    apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.inProgress });
    try {
      const options = {
        headers: {
          'Content-Type':
            type === 'file' ? '/' : type === 'm' ? 'multipart/form-data' : 'application/json',

          // Authorization: getAuthorization(),
        },
        responseType: responseType || 'json',
      };
      if (controller) {
        options.signal = controller?.signal;
      }
      const response = await apiInstance.get(apiUrl, options);
      handleErrors({ response, apiDispatch, callBackFunction });
    } catch (e) {
      if (controller && (axios.isCancel?.(e) || e.name === 'CanceledError')) {
        return;
      }
      const errorData = e.response?.data || {
        success: false,
        message: e.message,
      };
      callBackFunction && callBackFunction(errorData);
      apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.failure });
    }
  },

  postApiService: async ({
    apiUrl,
    apiDispatch,
    callBackFunction,
    controller,
    responseType,
    type,
    body,
  }) => {
    apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.inProgress });
    try {
      const options = {
        headers: {
          id: '12121',
          'Content-Type':
            type === 'file' ? '/' : type === 'm' ? 'multipart/form-data' : 'application/json',
          'ACIN-API-KEY': 'ACIN-SDGESDFYRGFSDF',
          // Authorization: getAuthorization(),
        },
        responseType: responseType || 'json',
      };
      if (controller) {
        options.signal = controller?.signal;
      }
      const response = await apiInstance.post(apiUrl, body, options);
      handleErrors({ response, apiDispatch, callBackFunction, responseType });
    } catch (e) {
      const errorData = e.response?.data || {
        success: false,
        message: e.message,
      };
      callBackFunction && callBackFunction(errorData);
      apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.failure });
    }
  },

  putApiService: async ({
    apiUrl,
    apiDispatch,
    callBackFunction,
    controller,
    responseType,
    type,
    body,
  }) => {
    apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.inProgress });
    try {
      const options = {
        headers: {
          'Content-Type':
            type === 'file' ? '/' : type === 'm' ? 'multipart/form-data' : 'application/json',
          // Authorization: getAuthorization(),
        },
        responseType: responseType || 'json',
      };
      if (controller) {
        options.signal = controller?.signal;
      }
      const response = await apiInstance.put(apiUrl, body, options);
      handleErrors({ response, apiDispatch, callBackFunction });
    } catch (e) {
      const errorData = e.response?.data || {
        success: false,
        message: e.message,
      };
      callBackFunction && callBackFunction(errorData);
      apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.failure });
    }
  },
};

export default apiServices;
