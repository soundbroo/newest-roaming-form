import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
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
  Tooltip,
  Avatar,
} from "@material-ui/core";
import FindInPageRoundedIcon from "@material-ui/icons/FindInPageRounded";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import {
  CATEGORIES,
  OPERATOR_STATE_MESSAGES,
  OPERATOR_STATE_DATA,
} from "constants";

const Search = ({ search, setSearch }) => {
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  return (
    <Input
      InputLabelProps={{ shrink: true }}
      size="small"
      label={OPERATOR_STATE_MESSAGES.title}
      autoFocus
      value={search}
      onChange={handleSearch}
      onBlur={(e) => e.preventDefault()}
      variant="outlined"
    />
  );
};

const Select = ({ category, setCategory }) => {
  const handleChange = (event) => {
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
      {Object.values(CATEGORIES).map((value) => (
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
  const [sortedByInvitation, setSortedByInvitation] = useState(false);
  const [filteredRows, setFilteredRows] = useState(OPERATOR_STATE_DATA);

  useEffect(() => {
    sortedByInvitation
      ? setFilteredRows(sortByInvitetion())
      : setFilteredRows(filterRows());
  }, [sortedByInvitation, category, search]);

  const sortByInvitetion = () => filterRows().filter((row) => row.invitation);

  const filterRows = () =>
    OPERATOR_STATE_DATA.filter((row) =>
      row.name.toUpperCase().includes(search.toUpperCase())
    ).filter((row) => {
      if (category === CATEGORIES.all) {
        return row;
      } else return row.cat === category;
    });

  const renderRows = () => {
    if (filteredRows?.length) {
      return filteredRows.map((row) => (
        <Row key={row.name}>
          <LabelCell component="th" scope="row">
            {row.name}
          </LabelCell>
          <Cell align="left">{row.prefix}</Cell>
          <Cell catcell="true" align="left">
            {row.cat}
          </Cell>
          <Cell align="left">
            {row.invitation && (
              <PeopleAltIcon color="primary" fontSize="default" />
            )}
          </Cell>
          <Tooltip title={`${row.status}%`} placement="left">
            <Cell align="right">
              <Progress
                variant="determinate"
                value={row.status}
                color="primary"
              />
            </Cell>
          </Tooltip>
        </Row>
      ));
    }
    return (
      <Row key="empty">
        <Cell colSpan={5}>
          <Nothing>
            <FindInPageRoundedIcon />
            <div>{OPERATOR_STATE_MESSAGES.notFound}</div>
          </Nothing>
        </Cell>
      </Row>
    );
  };

  return (
    <Container component={Paper}>
      <Table>
        <TableHead>
          <Row>
            <Cell colSpan={3}>
              <Search search={search} setSearch={setSearch} />
            </Cell>
            <AvatarCell
              align="left"
              onClick={() => setSortedByInvitation(!sortedByInvitation)}
            >
              <Tooltip title="Поддерживается отправка приглашений">
                <Invitation active={sortedByInvitation}>
                  <PeopleAltIcon color="primary" />
                </Invitation>
              </Tooltip>
            </AvatarCell>
            <SelectCell colSpan={1} align="left">
              <Select category={category} setCategory={setCategory} />
            </SelectCell>
          </Row>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </Container>
  );
};

export default OperatorsState;

const Container = styled(TableContainer)`
  max-width: 1200px !important;
  width: 100%;
  overflow-x: hidden !important;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c5c5c5;
  }
  @media (max-width: 660px) {
    margin-top: 9px;
  }
`;

const Row = styled(TableRow)`
  height: 48px !important;
`;

const Cell = styled(TableCell)`
  padding: 0 16px !important;
  @media (max-width: 660px) {
    padding: 0 3px !important;
    height: 48px;
    ${(p) =>
      p.catcell &&
      css`
        font-size: 0 !important;
        padding: 0 !important;
      `}
  }
`;

const Invitation = styled(Avatar)`
  background-color: ${({ active }) =>
    active ? "#6a1b9a !important" : "#fff !important"};
  border: 1.3px solid #6a1b9a;
  width: 32px !important;
  height: 32px !important;
  cursor: pointer;
  svg {
    color: ${({ active }) => (active ? "#fff" : "#6a1b9a")};
  }
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
  width: 200px;
  @media (max-width: 660px) {
    padding: 0 3px !important;
  }
`;

const AvatarCell = styled(Cell)`
  width: 36px;
`;

const SelectCell = styled(HeadCell)`
  @media (max-width: 660px) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: inherit;
    max-width: 86px;
  }
`;

const LabelCell = styled(Cell)`
  @media (max-width: 660px) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 120px;
  }
`;

const Nothing = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
  svg {
    font-size: 165px;
    color: ${(p) => p.theme.palette.grey};
  }
  div {
    color: ${(p) => p.theme.palette.darkGrey};
    font-weight: 600;
    letter-spacing: 0.05em;
  }
`;

const Progress = styled(LinearProgress)`
  background: ${(p) => {
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
    background: ${(p) => {
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
