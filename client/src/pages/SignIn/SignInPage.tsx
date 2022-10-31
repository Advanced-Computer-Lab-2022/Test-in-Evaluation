import React, { ChangeEvent, useState } from "react";
import axios from 'axios'
import {countries} from "../../data/countries";
import { apiURL } from "../../App";

import { useNavigate } from "react-router-dom";

import {
    TermsOfService,
    PrivacyPolicy,
    ContentOwnershipPolicy,
} from "../../data/policies";
import {
    Alert,
    Autocomplete,
    Box,
    Tabs,
    Tab,
    ToggleButtonGroup,
    ToggleButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Snackbar,
    Checkbox,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    AlertColor,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function SignInPage() {
    const navigate = useNavigate();

    type InputObject = {
        username: string,
        password: string
    }

    type SnackbarInformation = {
        snackbarOpen:boolean
        snackbarText:string,
        snackbarSeverity:AlertColor,
    }

    const [formInput, setFormInput] = useState<InputObject>({} as InputObject);
    const [snackbarInfo,setSnackbarInfo] = useState<SnackbarInformation>({} as SnackbarInformation)

    const handleSubmission = (event:any) => {
        event.preventDefault();

        axios.post(apiURL+'/login',{username: formInput.username, password: formInput.password}).then((response) => {
            navigate('/home')
        })
        .catch((error) => {
            console.log(error)
            setSnackbarInfo({
                snackbarOpen: true,
                snackbarText: error.response.data.error,
                snackbarSeverity: 'error'
            })
        })

    }


    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Snackbar autoHideDuration={6000} onClose={() => setSnackbarInfo({...snackbarInfo, snackbarOpen: false})} open={snackbarInfo.snackbarOpen}>
                <Alert variant='filled' severity={snackbarInfo.snackbarSeverity}>
                    <Typography>
                        {snackbarInfo.snackbarText}
                    </Typography>
                </Alert>
            </Snackbar>
            <Box sx={{boxShadow: 'rgba(0, 0, 0, 0.5) 0px 5px 15px', backgroundColor: 'white', width: '800px'}} >
                <Box sx={{width: '100%', height: '100%', paddingY: '10px'}} >
                    <Box sx={{display: 'flex', justifyContent: 'center'}} >
                        <Typography sx={{fontWeight: 'bold', fontSize: '45px'}}>
                            SIGN IN
                        </Typography>
                    </Box>
                    <form onSubmit={handleSubmission}>
                        <Box sx={{display: 'flex', gap: '20px', flexDirection: 'column', height: '90%', justifyContent: 'center'}}>
                            <Box sx={{paddingX: '80px',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center'}}>
                                    <TextField
                                        sx={{width: '100%'}}
                                        required
                                        variant='outlined'
                                        label='Username'
                                        value={formInput.username}
                                        onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
                                            setFormInput({...formInput,username: event.target.value})
                                        }}
                                    />
                            </Box>
                            <Box sx={{paddingX: '80px',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center'}}>
                                    <TextField
                                        sx={{width: '100%'}}
                                        required
                                        variant='outlined'
                                        label='Password'
                                        type='password'
                                        value={formInput.password}
                                        onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
                                            setFormInput({...formInput,password: event.target.value})
                                        }}
                                    />
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <Button sx={{height: '60px', width: '300px'}} type='submit' variant='contained'> SIGN IN </Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Box>

        </Box>

    );
}

export default SignInPage;
