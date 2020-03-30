export const changeFullname = (
  lastname,
  firstname,
  patronymic,
  field,
  formApi
) => {
  console.log("CHANGE");
  formApi.change(`${field}.lastname`, lastname);
  formApi.change(`${field}.firstname`, firstname);
  formApi.change(`${field}.patronymic`, patronymic);
};

export const effectInnChanges = (
  isEntityInn,
  isOrganizationInn,
  field,
  formApi
) => {
  console.log(field);
  if (isEntityInn) {
    formApi.change(`${field}.kpp`, undefined);
    formApi.change(`${field}.name`, undefined);
  }

  if (isOrganizationInn) {
    changeFullname(undefined, undefined, undefined, field, formApi);
  }
};
