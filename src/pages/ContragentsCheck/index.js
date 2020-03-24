import React, { useState } from "react";
import { Form } from "react-final-form";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import InputField from "components/Fields/InputField";
import { Wrapper, Title } from "components/Common/styled";

import { parse } from "utils/parse";
import { validate } from "utils/validate";

import { TITLES_FOR_KEYS } from "constants";

import AxiosService from "api";

const ContragentsCheck = () => {
  const axios = new AxiosService();

  const [data, setData] = useState(null);

  const submit = values => {
    const { inn, kpp } = values.contragents;
    if (kpp) {
      return axios.contragents(inn, kpp).then(res => {
        setData(JSON.parse(res.data.text));
      });
    }
    return axios.contragents(inn).then(res => {
      setData(JSON.parse(res.data.text));
    });
  };

  const renderAbonents = () => {
    if (data?.is_abonent) {
      return data?.abonents.map(abonent =>
        Object.entries(abonent).map(([key, value], index) => (
          <div>
            <span>{TITLES_FOR_KEYS[key]}:</span>
            <span>{value}</span>
          </div>
        ))
      );
    }
    if (data?.is_abonent === false)
      return <div>По данному ИНН ничего не найдено</div>;
  };
  return (
    <FormWrapper>
      <Form
        onSubmit={submit}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Title>
                Проверьте, кто обменивается документами через АО «Калуга Астрал»
              </Title>
              <FormContent>
                <InputField
                  name="contragents"
                  variant="outlined"
                  size="small"
                  fieldType="inn"
                  parse={parse.inn}
                />
                <InputField
                  name="contragents"
                  variant="outlined"
                  size="small"
                  fieldType="kpp"
                  parse={parse.kpp}
                  validate={validate.notRequiredKpp}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Проверить
                </Button>
              </FormContent>
            </form>
          );
        }}
      />
      <Abonents>{renderAbonents()}</Abonents>
    </FormWrapper>
  );
};

export default ContragentsCheck;

const FormWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding-bottom: 28px;
`;

const FormContent = styled.div`
  display: flex;
  div {
    flex: 1;
    height: 40px;
  }
  button {
    height: 40px;
    margin-right: 12px;
  }
`;

const Abonents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 12px 0;
  div {
    display: flex;
    padding: 12px 0;
    span:first-child {
      margin-right: 12px;
    }
  }
`;
