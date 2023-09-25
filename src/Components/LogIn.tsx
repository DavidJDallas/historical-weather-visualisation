import React from 'react';
import {Form} from 'react-bootstrap'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const LogIn = () => {
   return(
   <Box
        component="form"
        sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
    >


        <TextField
            // onSubmit={handlePostcodeSubmit} 
            // onChange={(event) =>setPostcode(event.target.value)}
            // onKeyDown ={handleTextChange} 
            // style={{width: '300px'}}
            id="standard-basic" label="Enter Postcode" variant="standard" 
        />     
        <TextField
            // onSubmit={handlePlaceSubmit} 
            // onChange={(event) =>setPlace(event.target.value)}
            // onKeyDown ={handleTextChange} 
            // style={{width: '300px'}}
            id="standard-basic" label="Enter Place" variant="standard" 
        />    



</Box>) 
}

export default LogIn