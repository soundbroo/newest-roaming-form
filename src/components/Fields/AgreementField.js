import React from "react";
import styled from "styled-components";

import UploadField from "components/Fields/UploadField";
import Link from "components/Common/Link";

const AgreementField = ({
  link,
  label,
  values,
  validate,
  showSnackbar,
  name,
  title,
  fileProps,
}) => (
  <Wrapper>
    <Link link={link} label={label} />
    <UploadField
      values={values}
      validate={validate}
      showSnackbar={showSnackbar}
      name={name}
      title={title}
      {...fileProps}
    />
  </Wrapper>
);

export default AgreementField;

const Wrapper = styled.div`
  margin: 12px 0;
  width: 100%;
  @media (max-width: 660px) {
    align-self: flex-end;
    margin: 0;
  }
`;
