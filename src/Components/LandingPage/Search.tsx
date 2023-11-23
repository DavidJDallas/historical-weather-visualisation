import React from 'react';
import { SearchFormProps } from './LandingPageTypes';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const LandingPageSearch = ({handlePostcodeSubmit,handlePlaceSubmit, setPlace, setPostcode}: SearchFormProps): JSX.Element => {
  
    const handleTextChange = (event: React.KeyboardEvent) => {
        if(event.keyCode === 13 || event.which === 13){
            event.preventDefault()
            handlePostcodeSubmit(event)
        } 
    };
    
    return(
    <>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
      >
      <TextField
         onSubmit={handlePostcodeSubmit} 
         onChange={(event) =>setPostcode(event.target.value)}
         onKeyDown ={handleTextChange} 
         style={{width: '300px'}}
         id="standard-basic" label="Enter Postcode" variant="standard" 
      />     
     <TextField
         onSubmit={handlePlaceSubmit} 
         onChange={(event) =>setPlace(event.target.value)}
         onKeyDown ={handleTextChange} 
         style={{width: '300px'}}
         id="standard-basic" label="Enter Place" variant="standard" 
      />    
    </Box>

  </>
    )
}

export default LandingPageSearch;