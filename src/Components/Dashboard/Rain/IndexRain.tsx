import React from 'react';
import { IndexProps } from './RainTypes';
import RainByMonth from './RainByMonth';
import { Container, Row, Col } from 'react-bootstrap';

const Rain = ({dataBySeason, dataByMonth, dataByYear, formattedData}: IndexProps): JSX.Element => {

    return(<>
    <h1>Rain</h1>
    <Container>
        <RainByMonth/>

    </Container>

    


    </>)
}

export default Rain