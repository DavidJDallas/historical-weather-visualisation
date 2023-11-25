import React from "react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const BigSpinner: React.FC = (): JSX.Element => {

    return(  
    
    <Box sx={{ width: '100%' }}>
        <LinearProgress />
    </Box>
    
    )
}

export default BigSpinner