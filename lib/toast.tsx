import toast from 'react-hot-toast';

interface ToastOptions {
  duration?: number;
}

// Custom toast with close button
const showToast = (
  message: string,
  type: 'success' | 'error',
  options?: ToastOptions
) => {
  const toastFn = type === 'success' ? toast.success : toast.error;
  
  return toastFn(
    (t) => (
      <div className="flex items-center justify-between gap-3 w-full">
        <span className="flex-1">{message}</span>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Close notification"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    ),
    {
      duration: options?.duration,
    }
  );
};

export const showSuccessToast = (message: string, options?: ToastOptions) => {
  return showToast(message, 'success', { duration: 3000, ...options });
};

export const showErrorToast = (message: string, options?: ToastOptions) => {
  return showToast(message, 'error', { duration: 5000, ...options });
};
