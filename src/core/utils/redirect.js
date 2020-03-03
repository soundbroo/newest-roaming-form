export const redirectToStatusCheck = (response, setActivePage) => {
  console.log(response);
  if (response?.data.status === 0) {
    setActivePage(2);
  }
};
