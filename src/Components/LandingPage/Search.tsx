import React, { SyntheticEvent , KeyboardEvent} from 'react';
import { SearchFormProps } from './LandingPageTypes';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { SearchContext } from '../../Context/SearchContext';
import { useContext } from 'react';


const LandingPageSearch = ({handlePostcodeSubmit,handlePlaceSubmit}: SearchFormProps): JSX.Element => {
  
    const searchContext = useContext(SearchContext);
    const {place, setPlace, postcode, setPostcode} = searchContext;

    const handleTextChange = (event: KeyboardEvent<HTMLInputElement>): void => {
        if(event.key === 'Enter'){
           event.preventDefault()
            if(place.length>0){             
                handlePostcodeSubmit()
            } else if (postcode.length>0){
                handlePlaceSubmit()
            } else{
                console.log('error - postcode or place must be submitted')
            }
            
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