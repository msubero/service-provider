import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { Profile } from "../interfaces/provider";

const useStyles = makeStyles(() => ({
  input: {
    display: "none",
  },
}));

export default function ProfileForm() {
  const classes = useStyles();
  const [file, setFile] = React.useState(false);
  const [error, setError] = React.useState(false);

  let profile: Profile;

  const store = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
  };

  const handleName = (e: any) => {
    const name: string = e.target.value;
    profile = { ...profile, name };
    store();
  };

  const handleAge = (e: any) => {
    const age: number = +e.target.value;
    if (age <= 0) {
      setError(true);
    } else {
      setError(false);
      profile = { ...profile, age };

      store();
    }
  };

  const handlePicture = (e: any) => {
    const picture = e.target.value;
    setFile(picture);
    profile = { ...profile, picture };
    store();
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        My profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9}>
          <TextField
            required
            id="name"
            name="name"
            label="Full name"
            fullWidth
            onChange={handleName}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            error={error}
            helperText={error ? "Age must be a positive number" : ""}
            id="age"
            name="age"
            label="Age"
            fullWidth
            type="number"
            onChange={handleAge}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={handlePicture}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="outlined"
              color="primary"
              component="span"
              fullWidth
              startIcon={<PhotoCamera />}
            >
              {file ? file : "Upload picture"}
            </Button>
          </label>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
