import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DatePicker from "react-datepicker";
import Button from '@mui/material/Button';
import "react-datepicker/dist/react-datepicker.css";
const Transaction = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rewardPoints, setRewardPoints] = useState();
  const [finalRewardpoints, setfinalRewardpoints] = useState();
  const [totalRewards, setTotalRewards] = useState();
  const [rangeRewardPoints, setRangeRewardPoints]=useState(0);
  let rewardPointsArray = [];
  let rewardObj = {};
  let calulatedRewardPoints;
  let rewardPointList = [];
  let totalrewardPointSum=0;
  let rewardPointRange=0;

 
  useEffect(() => {
    if (props.transactions) {
      const { transactions } = props;
      for (let i = 0, len = transactions.length; i < len; i++) {
        let amount = Math.floor(transactions[i].amount);
        let date = new Date(transactions[i].date);
        if (typeof (transactions[i].amount) === 'number' && transactions[i].amount > 50) {
          if (amount > 50 && amount <= 100) {
            calulatedRewardPoints = amount - 50;
            rewardObj.rewardPoints = calulatedRewardPoints;
            rewardObj.date = date.toLocaleDateString('en-CA');
            rewardObj.amount = amount;
            rewardPointsArray.push(JSON.stringify(rewardObj));
          } else {
            calulatedRewardPoints = 50 + (amount - 100) * 2;
            rewardObj.rewardPoints = calulatedRewardPoints;
            rewardObj.date = date.toLocaleDateString('en-CA');
            rewardObj.amount = amount;
            rewardPointsArray.push(JSON.stringify(rewardObj));
          }
        } else {
          calulatedRewardPoints = 0;
          rewardObj.rewardPoints = calulatedRewardPoints;
          rewardObj.date = date.toLocaleDateString('en-CA');
          rewardObj.amount = amount;
          rewardPointsArray.push(JSON.stringify(rewardObj));
        }
        setRewardPoints(rewardPointsArray);
        rewardPointList = rewardPoints && rewardPoints.map(rewardPoint => JSON.parse(rewardPoint));
        setfinalRewardpoints(rewardPointList);

      }
    }
  }, [rewardPointsArray]);

  useEffect(()=>{
    caluclateTotalRewardPoints();
  },[finalRewardpoints]);

  const handleStartDateChange = (date) => {
    setStartDate(new Date(date));
  }

  const handleEndDateChange = (date) => {
    setEndDate(new Date(date));
  }

  const caluclateRangeRewardPoints = () => {
    if(finalRewardpoints){
    for (let i = 0, len = finalRewardpoints.length; i < len; i++) {
      let tempDate = new Date(finalRewardpoints[i].date);
      if (tempDate>=startDate && tempDate<=endDate) {
      rewardPointRange+= parseInt(finalRewardpoints[i].rewardPoints);
      setRangeRewardPoints(rewardPointRange);
      }
  }
}
  }

const caluclateTotalRewardPoints = () => {
if(finalRewardpoints){
  for (let i = 0, len = finalRewardpoints.length; i < len; i++) {
    totalrewardPointSum+= parseInt(finalRewardpoints[i].rewardPoints);
    setTotalRewards(totalrewardPointSum);
    }
  }
}


  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" >Transaction Date</TableCell>
              <TableCell align="center">Transaction Amount</TableCell>
              <TableCell align="center">Reward Points/transaction</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finalRewardpoints && finalRewardpoints.map((rewardPoint) => (
              <TableRow>
                <TableCell align="center">{rewardPoint.date}</TableCell>
                <TableCell align="center">{'$' + rewardPoint.amount}</TableCell>
                <TableCell align="center">{rewardPoint.rewardPoints}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{'padding': '40px', 'height': '300px', 'fontWeight': '500', 'border': '1px solid grey'}}>
      <div className='date-input'>Select Start Date</div>
      <DatePicker selected={startDate} onChange={handleStartDateChange} />
      <div className='date-input'>Select End Date</div>
      <DatePicker selected={endDate} onChange={handleEndDateChange} />
      <Button style={{ 'float': 'left','marginTop': '15px'}} variant="contained" onClick={caluclateRangeRewardPoints}>Calculate Reward Points</Button>
      <div style={{"clear":"both"}}></div>
      <div style={{ 'marginTop': '15px','textAlign': 'left'}}><span>Reward Points (Based on selected Date)</span> {rangeRewardPoints}</div>    
      <div style={{ 'marginTop': '15px','textAlign': 'left' }}> <span>Total Reward Points:</span> <span>{totalRewards}</span></div>
      </div>
    </>
  );
};
export default Transaction
