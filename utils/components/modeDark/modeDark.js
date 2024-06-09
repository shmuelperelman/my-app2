"use client";
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Switch, Typography } from "@mui/material";

export default function DarkMode() {

  // ניהול המצב עבור מצב החושך
  const [toggleDarkMode, setToggleDarkMode] = useState(true);

  // פונקציה לשינוי מצב החושך
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  // יישום הצבעים הראשיים והמשניים לנושא
  const darkTheme = createTheme({
    palette: {
      mode: toggleDarkMode ? 'dark' : 'light', // שינוי מצב החושך
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#131052',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
        <Typography variant="h4">Toggle Dark mode</Typography>
        <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} />
      </div>
    </ThemeProvider>
  );
}
