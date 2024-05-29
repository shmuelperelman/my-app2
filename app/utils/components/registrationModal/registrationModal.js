import { Close } from "@mui/icons-material";
import { Button, CircularProgress, TextField } from "@mui/material";
import "./registrationModal.css";
import { useRef, useState } from "react";
import { register } from "@/utils/functions/apiCalls";

export default function RegistrationModal({ setOpen }) {
  // const { loading, setLoading } = useLoadingContext();
  const [passwordError, setPasswordError] = useState("");
  const passElement = useRef(null);
  const loading = false;
  async function handleSumbit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      const res = await register(data);
      alert(res);
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="column navbar-modal">
      <button
        className="navbar-modal-close-button"
        onClick={() => setOpen(false)}
      >
        <Close />
      </button>
      <form className="column form" onSubmit={handleSumbit}>
        <h1>Registration form</h1>
        <TextField name="username" label="username" />
        <TextField
          inputRef={passElement}
          name="password"
          label="password"
          type="password"
        />
        <TextField
          error={passwordError}
          label="confirmPassword"
          type="password"
          onChange={(e) => {
            if (e.target.value !== passElement.current.value) {
              setPasswordError("Passwords dont match");
            } else {
              setPasswordError("");
            }
          }}
          helperText={passwordError}
        />
        <TextField name="name" label="name" />
        {loading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" type="submit">
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}