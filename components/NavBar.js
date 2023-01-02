import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from "react";
import LoginDialog from './LoginDialog';
import Link from "next/link"

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';


import { Menu, MenuItem } from "@mui/material";
import { useRouter } from 'next/router';

const NavBar = () => {

    const [openLogin, setOpenLogin] = useState(false);
    const [user, setUser] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const router = useRouter();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const _signOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Logged out");
            setUser(null);
            router.push("/")
        }).catch((error) => {
            // An error happened.
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
                setUser(user);
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, width: "fit-content" }}>
                        <Link href="/" style={{ textDecoration: "none", color: "white" }}>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mx: 1, display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <LocalShippingIcon />
                                </Box>
                                <Typography variant="h6" component="div" sx={{ cursor: "pointer" }}>
                                    Parcel Grab
                                </Typography>
                            </Box>
                        </Link>
                    </Box>
                    {user ? <Button color='inherit' sx={{ width: 150 }} onClick={handleClick}><Typography noWrap>{user.displayName}</Typography></Button> : <Button color="inherit" onClick={() => setOpenLogin(true)}>Login</Button>}
                    {user ?
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={_signOut}>Logout</MenuItem>
                            </Menu>
                        :
                        null
                    }
                </Toolbar>
            </AppBar>
            <LoginDialog openLogin={openLogin} setOpenLogin={setOpenLogin} />
        </Box>
    );
}

export default NavBar;