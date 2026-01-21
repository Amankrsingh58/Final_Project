// // src/hooks/useToastNotifications.js
// import { Slide, toast } from 'react-toastify';

// export const useToastNotifications = () => {
//   const showSuccessToast = (message) => {
//     toast.success(message, {
//       position: "top-center",
//       autoClose: 1000,
//       hideProgressBar: true,
//       closeOnClick: false,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       transition: Slide,
//     });
//   };

//   const showErrorToast = (message) => {
//     toast.error(message, {
//       position: "top-center",
//       autoClose: 1000,
//       hideProgressBar: false,
//       closeOnClick: false,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       transition: Slide,
//     });
//   };

//   return { showSuccessToast, showErrorToast };
// };
