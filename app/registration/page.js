'use client';
import { Close, PhotoCamera } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, TextField } from '@mui/material';
import './registrationModal.css';
import { useRef, useState } from 'react';
import { register } from '@/utils/functions/apiCalls';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/utils/services/firebase';

export default function RegistrationModal() {
  const { loading, setLoading } = "false";
  const [passwordError, setPasswordError] = useState('');
  const passElement = useRef(null);
  const [profilePicture, setProfilePicture] = useState(null);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);

      if (profilePicture) {
        const storageRef = ref(storage, `profile_pictures/${Date.now()}_${profilePicture.name}`);
        await uploadBytes(storageRef, profilePicture);
        const profilePictureURL = await getDownloadURL(storageRef);
        data.profilePictureURL = profilePictureURL;
      }


      const res = await register(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="column navbar-modal">

      <form className="column form" onSubmit={handleSubmit}>
        <h1>Registration form</h1>
        <TextField name="username" label="Username" className="MuiTextField-root" />
        <TextField
          inputRef={passElement}
          name="password"
          label="Password"
          type="password"
          className="MuiTextField-root"
        />
        <TextField
          error={Boolean(passwordError)}
          label="Confirm Password"
          type="password"
          onChange={(e) => {
            if (e.target.value !== passElement.current.value) {
              setPasswordError("Passwords don't match");
            } else {
              setPasswordError('');
            }
          }}
          helperText={passwordError}
          className="MuiTextField-root"
        />
        <TextField name="name" label="Name" className="MuiTextField-root" />
        <TextField name="email" label="Email" type="email" className="MuiTextField-root" />
        <TextField name="birthdate" label="Birthdate" type="date" InputLabelProps={{ shrink: true }} className="MuiTextField-root" />
        <div className="file-input-container">
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            id="profilePicture"
            style={{ display: 'none' }}
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
          <label htmlFor="profilePicture">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
            <span>Upload Profile Picture</span>
          </label>
        </div>
       
        {loading ? (
          <CircularProgress className="MuiCircularProgress-root" />
        ) : (
          <Button variant="contained" type="submit" className="MuiButton-root">
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}
