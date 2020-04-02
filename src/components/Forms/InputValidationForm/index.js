import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form as FinalForm } from "react-final-form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { Content } from "components/Common/styled";
import Auth from "components/Common/Auth";
import NoDataPanel from "components/Forms/InputValidationForm/NoDataPanel";
import ValidationPanel from "components/Forms/InputValidationForm/ValidationPanel";
import CheckDataButton from "components/Forms/InputValidationForm/CheckDataButton";

import useModal from "hooks/useModal";

import saveXls from "utils/saveXls";

import { VALIDATION_FORM_TITLE, statuses } from "constants";

import { disableRules } from "utils/validate";

const InputValidationForm = ({
  values,
  errors,
  activePage,
  buttonProps,
  response,
  setResponse,
  setValidationErrors,
  fileProps: { files, filesToReload, setFilesToReload },
  snackbarProps,
  auth,
  setAuth,
  content,
  fileSaverSwitcher,
  setFileSaverSwitcher,
  submitting,
  operatorId,
  formApi,
  setNewPage
}) => {
  const { showSnackbar } = snackbarProps;

  const isSender = Boolean(values?.sender[0]) || files.sender_list;
  const isReceiver = Boolean(values?.receiver[0] || files.receiver_list);
  const notification = response?.data?.text;
  const emptyList = notification === "Список получателей пуст";
  const [xlsFormApi, setXlsFormApi] = useState({});

  const bindFormApi = xlsFormApi => {
    setXlsFormApi(xlsFormApi);
    const unsubscribe = () => {};
    return unsubscribe;
  };

  // Модалка авторизации на случай, если sessionToken окажется невалидным
  const [Modal, isModal, setIsModal] = useModal({
    component: Auth,
    auth,
    setAuth,
    refresh: auth.refresh,
    snackbarProps
  });

  useEffect(() => {
    if (notification) {
      const snackbarColor =
        response?.data?.status === 0 ? statuses.success : statuses.error;
      showSnackbar(notification, snackbarColor, true, null);
      if (
        response?.data?.sender?.text === "" ||
        response?.data?.receiver?.text === ""
      )
        setResponse(null);
    }
  }, [response]);

  useEffect(() => {
    if (auth.refresh === true) setIsModal(!isModal);
  }, [auth.refresh]);

  // Увидеть этот компонент вероятность крайне мала,
  // по историческим причинам на всякий случай оставлен
  const renderError = () => {
    const {
      noDataToSend,
      noDataDescription,
      sender,
      receiver
    } = VALIDATION_FORM_TITLE;
    return (
      <NoDataPanel title={noDataToSend} description={noDataDescription}>
        <CheckDataButton isData={isSender} title={sender} {...buttonProps} />
        <CheckDataButton
          isData={isReceiver}
          title={receiver}
          {...buttonProps}
        />
      </NoDataPanel>
    );
  };

  const [initialValues, setInitialValues] = useState([]);

  const handleSwitch = () => setFileSaverSwitcher(!fileSaverSwitcher);

  const renderSuccess = agent => {
    const checkAgent = agent => {
      switch (agent) {
        case "sender":
          return files.sender_list;
        case "receiver":
          return files.receiver_list;
      }
    };
    const agentFileName = `${agent}_list`;
    const agentFile = checkAgent(agent);
    const YouAreUpload = ({ agentFile }) => (
      <div>Вы загрузили файл {agentFile}</div>
    );

    if (agentFile && !response) return <YouAreUpload agentFile={agentFile} />;

    const renderAuthModal = () => {
      if (auth.refresh && isModal) {
        return <Modal />;
      }
      return null;
    };

    const validationData = response?.data?.[agent];

    return (
      <>
        {renderAuthModal()}
        <span>{VALIDATION_FORM_TITLE[agent]}</span>
        {!agentFile ? (
          values[agent].map((data, index) => (
            <ValidationPanel
              key={`${agent}[${index}]`}
              agentIndex={index}
              agent={agent}
              isFile={agentFile}
              notification={notification}
              data={data}
              operatorId={operatorId}
              activePage={activePage}
              processed={validationData?.[index].processed}
              responseText={validationData?.[index].text}
              responseErrors={validationData?.[index].errors}
              formApi={formApi}
              formErrors={errors}
              {...disableRules({ name: `${agent}[${index}]`, index, values })}
            />
          ))
        ) : !emptyList ? (
          <>
            <FinalForm
              onSubmit={() => {}}
              initialValues={{
                list: initialValues
              }}
              decorators={[bindFormApi]}
              render={({ handleSubmit, values, errors }) => {
                const handleSaveXls = () =>
                  saveXls(
                    filesToReload,
                    setFilesToReload,
                    agent,
                    agentFileName,
                    content.header,
                    values.list,
                    fileSaverSwitcher,
                    submitting,
                    response,
                    activePage
                  );

                const initialValues = values => {
                  const data = !values ? response?.data?.[agent] : values?.list;
                  let initial = [];
                  data.forEach((value, index) => {
                    initial[index] = value.input;
                  });
                  setInitialValues(initial);
                };

                useEffect(() => {
                  initialValues();
                }, [response]);

                useEffect(() => {
                  setValidationErrors(errors?.list);
                }, [errors]);

                useEffect(() => {
                  if (!errors?.list?.length) {
                    return handleSaveXls();
                  } else return;
                }, [errors, values]);

                return (
                  <>
                    <form onSubmit={handleSubmit}>
                      <ControlLabel
                        control={
                          <Switch
                            checked={fileSaverSwitcher}
                            onChange={handleSwitch}
                            value={fileSaverSwitcher}
                            color="primary"
                          />
                        }
                        label="Скачать измененный excel-файл в случае удачной отправки"
                      />
                      {values.list.map((data, index) => (
                        <ValidationPanel
                          key={`${agent}[${index}]`}
                          name="list"
                          agentIndex={index}
                          agent={agent}
                          isResponse={!!response}
                          isFile={agentFile}
                          notification={notification}
                          data={validationData?.[index].input}
                          xlsData={data}
                          operatorId={operatorId}
                          activePage={activePage}
                          processed={validationData?.[index].processed}
                          responseText={validationData?.[index].text}
                          responseErrors={validationData?.[index].errors}
                          formErrors={errors}
                          formApi={xlsFormApi}
                          {...disableRules({
                            name: `${agent}[${index}]`,
                            index,
                            values,
                            xls: true
                          })}
                        />
                      ))}
                    </form>
                    {/* <b
                      style={{
                        position: "fixed",
                        top: 200,
                        left: 60,
                        fontSize: 12
                      }}
                    >
                      <pre>{JSON.stringify(values, 0, 2)}</pre>
                    </b> */}
                  </>
                );
              }}
            />
          </>
        ) : (
          <YouAreUpload agentFile={agentFile} />
        )}
      </>
    );
  };

  const renderForm = () => {
    if (!isSender && !isReceiver) return renderError();
    return (
      <ValidationFormWrapper>
        {isSender && renderSuccess("sender")}
        {isReceiver && renderSuccess("receiver")}
      </ValidationFormWrapper>
    );
  };

  return renderForm();
};

export default InputValidationForm;

const ValidationFormWrapper = styled(Content)`
  margin-left: -16px;
`;

const ControlLabel = styled(FormControlLabel)`
  color: ${p => p.theme.palette.primaryLight};
  span {
    font-size: 14px;
  }
`;
