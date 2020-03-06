export const redirectToStatusCheck = (response, setActivePage) => {
  if (response?.data.status === 0) {
    setTimeout(() => setActivePage(2), 1500);
  }
  return;
};
