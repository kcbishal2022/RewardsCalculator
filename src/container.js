import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Transaction from './transaction';
import Box from '@mui/material/Box';
import { color, textAlign } from '@mui/system';


export default function Container() {
    //const { header, logo } = useStyles();
    const [customerName, setCustomerName] = useState();
    const [customerId, setCustomerId] = useState();
    const [selectedTransactions, setSelectedTransactions] = useState();

    const callCustomerApi = async () => {
        const data = await fetch('https://run.mocky.io/v3/baeb45f3-dab6-4399-84d2-03224657b6ba').then(response => response.json());
        setCustomerName(data.name);
        setCustomerId(data.id);
        setSelectedTransactions(data.transactions);
    }
    useEffect(() => {
        callCustomerApi();
    }, []);


    const SubHeading = (props) => {
        console.log(props);
        return (
            <Box
                sx={{
                    width: '100%',
                    height: 100,
                    backgroundColor: '#ededed',
                    border: '1px solid gray',
                    fontWeight: '500',
                    padding: '10px',
                }}>
                <div style={{'marginTop':'40px', 'textAlign':'left'}}>
                    <div><span>customerId:</span> <span>{props.customerId}</span> </div> 
                    <div><span>customerName: </span> <span>{props.customerName}</span></div>
                </div>
            </Box>
        );
    }

    return (
        <>
           <SubHeading customerName= {customerName}  customerId = {customerId}/>
           <Transaction transactions={selectedTransactions}/>
        </>

    );
};