import React, { useState } from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  TextField,
  MenuItem,
  Tooltip
} from "@material-ui/core";
import FindInPageRoundedIcon from "@material-ui/icons/FindInPageRounded";

import { CATEGORIES, rows } from "constants";

const Search = ({ search, setSearch }) => {
  const handleSearch = event => {
    setSearch(event.target.value);
  };
  return (
    <Input
      InputLabelProps={{ shrink: true }}
      size="small"
      label="Поиск по операторам"
      autoFocus
      value={search}
      onChange={handleSearch}
      onBlur={e => e.preventDefault()}
      variant="outlined"
    />
  );
};

const Select = ({ category, setCategory }) => {
  const handleChange = event => {
    setCategory(event.target.value);
  };
  return (
    <Input
      size="small"
      select
      value={category}
      onChange={handleChange}
      variant="outlined"
    >
      {Object.values(CATEGORIES).map(value => (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem>
      ))}
    </Input>
  );
};

const OperatorsState = () => {
  const [category, setCategory] = useState(CATEGORIES.all);
  const [search, setSearch] = useState("");

  const filteredRows = rows
    .filter(row => row.name.toUpperCase().includes(search.toUpperCase()))
    .filter(row => {
      if (category === CATEGORIES.all) {
        return row;
      } else return row.cat === category;
    });

  const renderRows = () => {
    if (filteredRows.length) {
      return filteredRows.map(row => (
        <TableRow key={row.name}>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="left">{row.cat}</TableCell>
          <Tooltip title={`${row.status}%`} placement="left">
            <TableCell align="right">
              <Progress
                variant="determinate"
                value={row.status}
                color="primary"
              />
            </TableCell>
          </Tooltip>
        </TableRow>
      ));
    }
    return (
      <TableRow key="empty">
        <TableCell colSpan={3}>
          <Nothing>
            <FindInPageRoundedIcon />
            <div>Оператор с таким названием не найден</div>
          </Nothing>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Container component={Paper}>
      <Table>
        <TableRow>
          <HeadCell colSpan={2}>
            <Search search={search} setSearch={setSearch} />
          </HeadCell>
          <HeadCell colSpan={1} align="left">
            <Select category={category} setCategory={setCategory} />
          </HeadCell>
        </TableRow>
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </Container>
  );
};

export default OperatorsState;

const Container = styled(TableContainer)`
  width: 1000px !important;
  overflow-x: hidden !important;
`;

const Input = styled(TextField)`
  padding: 0 !important;
  background: rgba(195, 195, 195, 0.08);
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  label {
    transform: translate(5px, -6px) scale(0.75) !important;
  }
`;

const HeadCell = styled(TableCell)`
  padding: 6px !important;
  width: 200px;
  .MuiSelect-outlined.MuiSelect-outlined {
    width: 154px;
  }
`;

const Nothing = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 165px;
    color: ${p => p.theme.palette.grey};
  }
  div {
    color: ${p => p.theme.palette.darkGrey};
    font-weight: 600;
    letter-spacing: 0.05em;
  }
`;

const Progress = styled(LinearProgress)`
  background: ${p => {
    switch (p.value) {
      case 100:
        return "#4caf50";
      case 75:
        return "#dcedc8";
      case 50:
        return "#fff9c4";
      case 25:
        return "#ffe0b2";
    }
  }} !important;

  div {
    background: ${p => {
      switch (p.value) {
        case 100:
          return "#4caf50";
        case 75:
          return "#8bc34a";
        case 50:
          return "#ffeb3b";
        case 25:
          return "#ff9800";
      }
    }} !important;
  }
`;
