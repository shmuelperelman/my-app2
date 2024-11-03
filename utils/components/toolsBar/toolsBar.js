import React from "react";
import { TextField, Select, MenuItem } from "@mui/material";
import "./toolsBar.css"
const ToolsBar = ({ sortBy, setSortBy }) => {
  return (
    <div className="tools-bar">
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
