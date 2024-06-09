'use client';
import { Button, CircularProgress } from '@mui/material';
import { useFormStatus } from 'react-dom';

export default function SubmitBtn({ text = 'Add product' }) {
  const { pending } = useFormStatus();
  return pending ? (
    <CircularProgress />
  ) : (
    <Button type="submit" variant="contained">
      {text}
    </Button>
  );
}
