const markErrors = (formErrors, formApi) => {
  const mark = agent => {
    for (let key in formErrors[agent]) {
      for (let err in formErrors[agent][key]) {
        formApi.focus(`${agent}[${key}].${err}`);
        formApi.blur(`${agent}[${key}].${err}`);
      }
    }
  };
  if (Object.keys(formErrors).length) {
    if (formErrors.sender) {
      mark("sender");
    }
    if (formErrors.receiver) {
      mark("receiver");
    }
  }
};

export default markErrors;
