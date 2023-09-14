import React from 'react';
import {Form} from 'react-bootstrap'
import { SearchFormProps } from './LandingPageTypes';

const LandingPageSearch = ({handlePostcodeSubmit,handlePlaceSubmit, setPlace, setPostcode}: SearchFormProps) => {
  

    const handleTextChange = (event: React.KeyboardEvent) => {
        if(event.keyCode === 13 || event.which === 13){
            event.preventDefault()
            handlePostcodeSubmit(event)
        } 
    };

    return(
    <>
        

      <Form onSubmit = {handlePostcodeSubmit} className='search-by-postode'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{fontSize: '1.854rem', marginTop: '12px'}}
       
        >Search By Postcode or Place</Form.Label>
        <Form.Control type="postcode" placeholder="Enter Postcode or Place" 
        onChange={(event) =>setPostcode(event.target.value)}
        onKeyDown ={handleTextChange} 
        style={{width: '300px'}}
        
        />     
      </Form.Group>
      
      </Form>
      

  </>
    )
}

export default LandingPageSearch;