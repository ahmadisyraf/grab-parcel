import { Box, TextField, Paper, Typography, Stack, Button } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState, useRef } from "react";
import { useRouter } from "next/router";

import { Slide, Fade } from "@mui/material";

import { useTheme, useMediaQuery } from "@mui/material";

import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

export default function Request() {

    const [value, setValue] = useState(dayjs('2022-04-07'));
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    const [api, setApi] = useState(`/api/checkout_sessions?quantity=${1}&price=${"price_1MLg6qBqLKhFIhiIBvNN6aBv"}`);

    const containerRef = useRef();

    const handleSubmit = () => {
        router.push("/request/success");
    }

    const [item, setItem] = useState({
        quantity: 1,
        price: "price_1MLg6qBqLKhFIhiIBvNN6aBv",
    });

    // const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    // const stripePromise = loadStripe(publishableKey);

    const createCheckOutSession = async () => {

        let stripePromise = null;

        if (!stripePromise) {
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        }

        try {
            const stripe = await stripePromise;
            const checkoutSession = await axios.post('/api/checkout_session', {
                item: item,
                headers: {
                    "Content-Type": 'application/json'
                  }
            });
            const result = await stripe.redirectToCheckout({
                sessionId: checkoutSession.data.id,
            });

            if (result.error) {
                alert(result.error.message);
            }
        } catch (err) {
            console.log(err.response);
        }

    };

    return (
        <div>
            <Box sx={{ mt: mobile ? 15 : 20, mb: 20 }} ref={containerRef}>
                <Slide direction="up" in={true} container={containerRef.current} timeout={{ enter: 800 }} >
                    <Paper elevation={3} sx={{ mx: mobile ? 1 : 40, px: 3, py: 3 }}>
                        <Box sx={{ mb: 5 }}>
                            <Typography variant="h4">Request for parcel pickup</Typography>
                            <Typography variant="subtitle1">Fill in the form to proceed our services</Typography>
                        </Box>
                        <Box>
                            <Stack direction={"column"} spacing={3}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Full name"
                                    defaultValue=" "
                                    fullWidth
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Matric number"
                                    defaultValue=" "
                                    fullWidth
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Phone number"
                                    defaultValue=" "
                                    fullWidth
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Residence room number"
                                    defaultValue=" "
                                    fullWidth
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Tracking number"
                                    defaultValue=" "
                                    fullWidth
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Estimate pacel arrive"
                                        openTo="year"
                                        views={['year', 'month', 'day']}
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Extra information"
                                    defaultValue=" "
                                    fullWidth
                                />
                                {/* <Paper variant="outlined" sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 10}}>
                                <Button variant="contained" component="label">
                                    Upload Image
                                    <input hidden accept="image/*" multiple type="file" />
                                </Button>
                            </Paper> */}
                                <Button variant="contained" type="submit" onClick={createCheckOutSession}>
                                    Confirm request
                                </Button>
                                <Typography variant="caption">Note :  Every parcel will be charge RM 2.00</Typography>
                            </Stack>
                        </Box>
                    </Paper>
                </Slide>
            </Box>
        </div>
    );
}