import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from 'react';
import { Inter } from '@next/font/google'

import NavBar from '../components/NavBar';
import { Fab, Box, Button, Stack, Divider, Paper, useMediaQuery, useTheme, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FastForwardIcon from '@mui/icons-material/FastForward';
import AccessibilityIcon from '@mui/icons-material/Accessibility';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import LockIcon from '@mui/icons-material/Lock';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebase';

import LoginPopup from '../components/loginPopup';

import { Slide, Fade } from "@mui/material";

export default function Home() {

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();

  const heroContainer = useRef();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log("user id is" + uid);
        console.log(user);
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

// Hello world
  return (
    <div>
      <Box sx={{ mt: 20 }}>
        <Box sx={{ textAlign: "center", mx: mobile ? 3 : 40 }} ref={heroContainer.current}>
          <Slide direction="right" in={true} container={heroContainer.current} timeout={{ enter: 800 }} >
            <Box>
              <Fade in={true} timeout={{ enter: 1000 }}>
                <Stack direction="column" spacing={1}>
                  <Typography variant='overline'>THE NEW TRANSFORMATION</Typography>
                  <Typography variant={'h3'}>We built system that solve UMP student missing parcel problem</Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Button endIcon={<NavigateNextIcon />} sx={{ width: "fit-content" }} onClick={() => user ? router.push("/request") : setOpen(true)}>Request for Parcel Pickup</Button>
                  </Box>
                </Stack>
              </Fade>
            </Box>
          </Slide>
        </Box>
        <Box sx={{ mt: mobile ? 8 : 15, mb: 10, display: "flex", flexDirection: "column", alignItems: "center", mx: mobile ? 3 : "none" }}>
          <Stack direction={mobile ? "column" : "row"} spacing={mobile ? 3 : 5}>
            <Box sx={{ px: 3, py: 3, width: 300 }}>
              <LockIcon color='primary' sx={{ fontSize: 30, mr: 2 }} />
              <Typography variant='h6'>Secure</Typography>
              <Typography variant='subtitle1'>Your parcel will be safe with our services</Typography>
            </Box>
            <Box sx={{ px: 3, py: 3, width: 300 }}>
              <FastForwardIcon color='primary' sx={{ fontSize: 30 }} />
              <Typography variant='h6'>Faster</Typography>
              <Typography variant='subtitle1'>Your parcel will be in front of your residence door</Typography>
            </Box>
            <Box sx={{ px: 3, py: 3, width: 300 }}>
              <AccessibilityIcon color='primary' sx={{ fontSize: 30 }} />
              <Typography variant='h6'>Accessible</Typography>
              <Typography variant='subtitle1'>Our services easily to access everywhere and everytime</Typography>
            </Box>
          </Stack>
        </Box>
        {/* <Box sx={{ mt: 13 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant='h4' fontWeight={500}>Our plan</Typography>
            <Typography variant='h5' sx={{ color: "gray" }}>Choose one of our services for you</Typography>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Paper elevetion={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5">Parcel to UMP</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <Stack direction={"row"} spacing={2}>
                    <Typography variant='h3'>$2</Typography>
                    <Typography variant='h6' sx={{ color: "grey" }}>/Parcel</Typography>
                  </Stack>
                </Box>
              </Box>
            </Paper>
            <Paper elevetion={3}>

            </Paper>
          </Box>
        </Box> */}
      </Box>
      <LoginPopup open={open} setOpen={setOpen} />
    </div>
  );
}
