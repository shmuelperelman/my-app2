"use client";

import React, { useState } from 'react';
import { Button, CircularProgress, Typography } from "@mui/material";
import './Error.css'; 

export default function Error({ error, reset }) {
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setLoading(true);
    reset();
  };

  return (
    <div className="error-container">
      <Typography variant="h2" color="error" aria-live="assertive">
        {error.message}
      </Typography>
      <div className="error-actions">
        <Button
          variant="contained"
          color="primary"
          onClick={handleReset}
          disabled={loading}
        >
          {loading ? <CircularProgress size={40} /> : 'Try again'}
        </Button>
      </div>
    </div>
  );
}
