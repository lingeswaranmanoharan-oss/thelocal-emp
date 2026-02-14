import './ForgotPassword.scss';
import { useState } from 'react';
import * as yup from 'yup';
import { Button } from '../../../../components/Button/Button';
import { Input } from '../../../../components/Input/Input';
import { Icon } from '@iconify/react';
import { forgotPasswordApi } from '../../services/authService';
import toaster from '../../../../services/toasterService';

const ForgotPassword = () => {
  const forgotPasswordSchema = yup.object().shape({
    email: yup.string().required('Email is required').email('Please enter a valid email address'),
  });

  const [forgotPasswordFormData, setForgotPasswordFormData] = useState({
    email: '',
  });

  const [forgorPasswordErrors, setForgorPasswordErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForgotPasswordField = async (field, value) => {
    try {
      await forgotPasswordSchema.validateAt(field, { [field]: value });
      setForgorPasswordErrors((prev) => ({ ...prev, [field]: '' }));
    } catch (error) {
      setForgorPasswordErrors((prev) => ({ ...prev, [field]: error.message }));
    }
  };

  const handleChange = async (field, value) => {
    setForgotPasswordFormData((prev) => ({ ...prev, [field]: value }));

    await validateForgotPasswordField(field, value);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setForgorPasswordErrors({});
    setIsLoading(true);

    try {
      await forgotPasswordSchema.validate(forgotPasswordFormData, { abortEarly: false });
      const response = await forgotPasswordApi(forgotPasswordFormData);
      console.log('Form is valid:', forgotPasswordFormData);
      console.log('Forgot api response', response);
      if (response?.success) {
        toaster.success(response.message || 'Reset link sent to your email!');
        setForgotPasswordFormData({ email: '' });
        setForgorPasswordErrors({});
      }
    } catch (error) {
      console.log(error.inner);
      if (error.inner) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setForgorPasswordErrors(validationErrors);
      } else {
        const message =
          error?.response?.data?.error?.message ||
          error?.response?.data?.message ||
          error.message ||
          'Something went wrong';
        toaster.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const emailIcon = <Icon icon="mdi:email-outline" className="w-5 h-5 text-gray-500" />;

  return (
    <form className="login-form">
      <h1 className="text-2xl flex justify-center font-bold text-gray-800 mb-2">
        Forgot Password?
      </h1>
      <p className="text-sm flex justify-center items-center text-center text-gray-600 mb-4">
        If you forgot your password, well, then we'll email you instructions to reset your password.
      </p>
      <div className="login-form-fields">
        {/* <Input
          id="email"
          label="Email Address"
          type="email"
          value={forgotPasswordFormData.email}
          onChange={(value) => handleForgotEmailChange('email', value)}
          error={forgorPasswordErrors.email}
          rightIcon={emailIcon}
        /> */}
        <Input
          id="email"
          label="Email Address"
          type="email"
          value={forgotPasswordFormData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={forgorPasswordErrors.email}
          rightIcon={emailIcon}
          className="mb-4"
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        className="login-submit-button w-full"
        onClick={handleForgotPasswordSubmit}
      >
        Submit
      </Button>
      <div className="login-form-footer">
        <p className="text-sm text-gray-600">
          Return to
          <a
            href="/login"
            className="create-account-link cursor-pointer pl-1"
            onClick={() => showHideLogIn(true)}
          >
            Sign In
          </a>
        </p>
      </div>
    </form>
  );
};

export default ForgotPassword;
