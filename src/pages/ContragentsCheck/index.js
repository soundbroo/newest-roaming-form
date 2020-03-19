import React from "react";
import { Form } from "react-final-form";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import InputField from "components/Fields/InputField";
import { Wrapper } from "components/Common/styled";

import { parse } from "utils/parse";

const ContragentsCheck = () => {
  const submit = values => console.log(values);
  return (
    <FormWrapper>
      <Form
        initialValues={{ inn: 123 }}
        onSubmit={submit}
        render={({ handleSubmit, submitting, values }) => {
          return (
            <form onSubmit={() => handleSubmit(values)}>
              <Title>
                Проверьте, кто обменивается документами через АО «Калуга Астрал»
              </Title>
              <FormContent>
                <InputField
                  variant="outlined"
                  fieldType="inn"
                  parse={parse.inn}
                />
                <Button variant="contained" color="primary">
                  Primary
                </Button>
              </FormContent>
            </form>
          );
        }}
      />
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

const Title = styled.div`
  font-size: 22px;
  margin-bottom: 18px;
  width: 100%;
  text-align: center;
`;
