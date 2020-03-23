import React, { useState } from "react";
import { Form } from "react-final-form";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import InputField from "components/Fields/InputField";
import { Wrapper, Title } from "components/Common/styled";

import { parse } from "utils/parse";

import AxiosService from "api";

const ContragentsCheck = () => {
  const axios = new AxiosService();

  const [data, setData] = useState(null);

  const submit = values => {
    return axios.contragents(values?.contragents?.inn).then(res => {
      setData(res);
      console.log(data);
    });
  };
  return (
    <FormWrapper>
      <Form
        onSubmit={submit}
        render={({ handleSubmit, submitting, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Title>
                Проверьте, кто обменивается документами через АО «Калуга Астрал»
              </Title>
              <FormContent>
                <InputField
                  name="contragents"
                  variant="outlined"
                  fieldType="inn"
                  parse={parse.inn}
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
      {data ? <div></div> : null}
    </FormWrapper>
  );
};

export default ContragentsCheck;

const FormWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  margin: 0;
`;

const FormContent = styled.div`
  display: flex;
  button {
    height: 56px;
    margin-right: 12px;
  }
`;
