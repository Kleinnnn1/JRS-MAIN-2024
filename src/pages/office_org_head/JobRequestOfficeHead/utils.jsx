// utils.js
export const getCurrentDate = () => {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString(undefined, options);
  };