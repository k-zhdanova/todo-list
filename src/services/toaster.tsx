import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TOAST_DEFAULT_OPTIONS: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: true,
  theme: 'light',
};

export const showSuccessToast = (message: string, options = {}) => {
  toast.success(message, {
    ...TOAST_DEFAULT_OPTIONS,
    ...options,
  });
};

export const showErrorToast = (message: string, options = {}) => {
  toast.error(message, {
    ...TOAST_DEFAULT_OPTIONS,
    ...options,
  });
};

export const showInfoToast = (message: string, options = {}) => {
  toast.info(message, {
    ...TOAST_DEFAULT_OPTIONS,
    ...options,
  });
};

export const showWarningToast = (message: string, options = {}) => {
  toast.warn(message, {
    ...TOAST_DEFAULT_OPTIONS,
    ...options,
  });
};

