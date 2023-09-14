import React from 'react';
import {Form} from 'react-bootstrap'
import { SearchFormProps } from './LandingPageTypes';

const LandingPageSearch = ({handleSubmit, setPlace, setPostcode}: SearchFormProps) => {
  
    const handlePlaceTextChange = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13){
            event.preventDefault()
            handleSubmit(event)
        }      
    };
    const handlePostcodeTextChange = (event: React.KeyboardEvent) => {
        if(event.keyCode === 13 || event.which === 13){
            event.preventDefault()
            handleSubmit(event)
        } 
    };

    return(
    <>
        

      <Form onSubmit = {handleSubmit} className='search-by-postode'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{fontSize: '1.854rem', marginTop: '12px'}}
       
        >Search By Postcode</Form.Label>
        <Form.Control type="postcode" placeholder="Enter Postcode" 
        onChange={(event) =>setPostcode(event.target.value)}
        onKeyDown ={handlePostcodeTextChange} 
        style={{width: '300px'}}
        
        />     
      </Form.Group>
      
      </Form>
      

    <Form onSubmit = {handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{fontSize: '1.854rem', textAlign: 'center'}}
        >Search By Place</Form.Label>
        <Form.Control type="place" placeholder="Enter Place" 
        onChange={(event) =>setPlace(event.target.value)}
        onKeyDown ={handlePlaceTextChange} 
        className=''
        style={{width: '300px'}}
        />      
      </Form.Group>
      
      </Form>            
    </>
    )
}

export default LandingPageSearch;