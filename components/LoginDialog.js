import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TextField, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import { auth, provider, google } from './firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

import { useState, useEffect } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function LoginDialog({ openLogin, setOpenLogin }) {
    // const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpenLogin(true);
    };
    const handleClose = () => {
        setOpenLogin(false);
    };

    const _signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log("user id is" + uid);
                console.log(user);
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    });

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={openLogin}
                fullWidth
                maxWidth={'xs'}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Login to your account
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box>
                        <Button variant="contained" fullWidth startIcon={<GoogleIcon />} onClick={_signInWithGoogle}>Login with Google</Button>
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}