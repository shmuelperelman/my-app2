import React from "react";
import { TextField, Select, MenuItem } from "@mui/material";

const ToolsBar = ({ sortBy, setSortBy, setSearch }) => {
  return (
    <div className="tools-bar">
      <TextField
        label="Search"
        variant="outlined"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        displayEmpty
      >
        <MenuItem value={0}>Sort by</MenuItem>
        <MenuItem value={1}>Price Ascending</MenuItem>
        <MenuItem value={2}>Price Descending</MenuItem>
      </Select>
    </div>
  );
};

export default ToolsBar;
