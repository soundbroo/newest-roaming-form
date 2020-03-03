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
  MenuItem
} from "@material-ui/core";

import { categories, rows } from "constants";

const Search = ({ search, setSearch }) => {
  const handleSearch = event => {
    setSearch(event.target.value);
  };
  return (
    <TextField
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
    <TextField
      select
      value={category}
      onChange={handleChange}
      variant="outlined"
    >
      {Object.values(categories).map(value => (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem>
      ))}
    </TextField>
  );
};

const OperatorsState = () => {
  const [category, setCategory] = useState(categories.all);
  const [search, setSearch] = useState("");

  return (
    <Container component={Paper}>
      <Table>
        <TableRow>
          <TableCell colSpan={2}>
            <Search search={search} setSearch={setSearch} />
          </TableCell>
          <TableCell colSpan={1} align="left">
            <Select category={category} setCategory={setCategory} />
          </TableCell>
        </TableRow>
        <TableBody>
          {rows
            .filter(row =>
              row.name.toUpperCase().includes(search.toUpperCase())
            )
            .filter(row => {
              if (category === categories.all) {
                return row;
              } else return row.cat === category;
            })

            .map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.cat}</TableCell>
                <TableCell align="right">
                  <LinearProgress
                    variant="determinate"
                    value={row.status}
                    color="secondary"
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default OperatorsState;

const Container = styled(TableContainer)`
  width: 1000px !important;
  overflow-x: hidden !important;
`;

const Head = styled.div`
  display: flex;
  width: 100%;
`;
