import React, { useState, useEffect } from 'react';
import Transaction from './transaction';
import  Header from './header';



export default function Container() {
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
    return (
        <>
           <Header customerName= {customerName}  customerId = {customerId}/>
           <Transaction transactions={selectedTransactions}/>
        </>

    );
};