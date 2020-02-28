import React from "react";
import {
  StyledFormFieldsWrapper,
  FormFieldsRow
} from "components/Common/styled";

const WrappedFieldsRows = ({ components }) => {
  const getRows = () => {
    let rows = [];
    for (let key in components) {
      if (components[key] !== undefined) {
        rows[key] = components[key];
      }
    }
    return rows;
  };

  const renderRows = () => {
    const rows = getRows();
    if (!rows.length) return null;
    return (
      <StyledFormFieldsWrapper>
        {rows.map((row, index) => (
          <FormFieldsRow key={index}>{row}</FormFieldsRow>
        ))}
      </StyledFormFieldsWrapper>
    );
  };

  return renderRows();
};

export default WrappedFieldsRows;
