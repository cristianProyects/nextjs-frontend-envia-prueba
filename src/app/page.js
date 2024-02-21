"use client";
import Image from "next/image";
// import styles from "./page.module.css";
import * as React from "react";
import Box from "@mui/material/Box";

import {
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import KeyIcon from "@mui/icons-material/Key";

export default function Home() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const login = async (e) => {
    e.preventDefault();
    const email = e.target.email.value
   const password = e.target.password.value
    const response = await fetch(`http://localhost:3001/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ocurrió un error al realizar la solicitud.");
        }
        return response.json();
      })
      .then((data) => {
        window.localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      });
  };
  return (
    <Grid
      justifyContent={"center"}
      container
      height={"100vh"}
      alignItems={"center"}
      style={{
        backgroundColor: "#fff",
      }}
    >
      <Grid
        boxShadow={"rgb(38, 57, 77) 0px 20px 30px -10px"}
        borderRadius={3}
        overflow={"hidden"}
        width={350}
      >
        <Grid container item alignItems={"center"} justifyContent={"center"}>
          <img
            style={{
              objectFit: "cover",
              padding: "20px",
              width: "auto",
              height: "50px",
            }}
            src="https://s3.us-east-2.amazonaws.com/enviapaqueteria/uploads/landing/images/countries/MEX/logo-dark.svg"
            alt="Logo Ecommerce"
          />
        </Grid>
        <form onSubmit={login}>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"center"}
            padding={"25px 45px"}
            gap={"15px"}
            style={{ backgroundColor: "white" }}
          >
            <Grid
              container
              item
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  minWidth: "100%",
                }}
              >
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  id="email"
                  label="Correo"
                  variant="standard"
                  fullWidth
                  color="primary"
                />
              </Box>
            </Grid>
            <Grid
              container
              item
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  minWidth: "100%",
                }}
              >
                <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <FormControl variant="standard" fullWidth>
                  <InputLabel htmlFor="standard-adornment-password">
                    Contraseña
                  </InputLabel>
                  <Input
                    id="password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              style={{ paddingTop: "10px" }}
            >
              <Button variant="contained" color="primary" type="submit">
                Iniciar sesión
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
