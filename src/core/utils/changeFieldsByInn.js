export const changeFullname = (
  lastname,
  firstname,
  patronymic,
  field,
  formApi
) => {
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
  if (isEntityInn) {
    formApi.change(`${field}.kpp`, undefined);
    formApi.change(`${field}.name`, undefined);
  }

  if (isOrganizationInn) {
    changeFullname(undefined, undefined, undefined, field, formApi);
  }
};
