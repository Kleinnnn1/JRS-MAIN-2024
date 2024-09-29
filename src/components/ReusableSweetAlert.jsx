import Swal from 'sweetalert2';



// Success Alert
export const successAlert = (title, text) => {
  Swal.fire({
    title: title || 'Success!',
    text: text || 'Your operation was successful.',
    icon: 'success',
    confirmButtonText: 'OK',
  });
};

// Error Alert
export const errorAlert = (title, text) => {
  Swal.fire({
    title: title || 'Error!',
    text: text || 'Something went wrong!',
    icon: 'error',
    confirmButtonText: 'OK',
  });
};

// Warning Alert
export const warningAlert = (title, text) => {
  Swal.fire({
    title: title || 'Warning!',
    text: text || 'Be careful with this action.',
    icon: 'warning',
    confirmButtonText: 'OK',
  });
};

// Confirmation Alert with a callback for the confirmed action
export const confirmationAlert = (title, text, confirmCallback) => {
  Swal.fire({
    title: title || 'Are you sure?',
    text: text || 'Do you want to proceed?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, proceed',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      if (typeof confirmCallback === 'function') {
        confirmCallback(); // Call the callback function when confirmed
      }
      Swal.fire({
        title: 'Confirmed!',
        text: 'The action has been confirmed.',
        icon: 'success',
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'The action was cancelled.', 'error');
    }
  });
};