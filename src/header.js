import React from 'react';
import Box from '@mui/material/Box';


const Header = (props) => {
  console.log(props);
  return (
      <Box
          sx={{
              width: '100%',
              height: '100px',
              backgroundColor: '#1976d2;',
              border: '1px solid #ededed',
              fontWeight: '500',
              padding: '10px',
              color: '#fff'
          }}>
            <div style={{'height': '40px', 'fontWeight': '500px' }}> Rewards Calculator </div>
          <div style={{'textAlign':'left'}}>
              <div><span>customerId:</span> <span>{props.customerId}</span> </div> 
              <div><span>customerName: </span> <span>{props.customerName}</span></div>
          </div>
      </Box>
  );
}

export default Header
                       
   
