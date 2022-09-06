import React, { useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import style from './ProgressBar.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setState } from '../../../redux/actions/userActions'

const steps = ['Pending', 'In Progress', 'Completed'];

export default function ProgressBar({status, order, rows}) {
  let dispatch = useDispatch()
  const [activeStep, setActiveStep] = useState(status==='Pending'?1:status==='In Progress'?2:3);
  let newStatus=''
  
  useEffect(()=>{
  },[dispatch])

  const handleNext = () => {
    activeStep===1?newStatus='In Progress':newStatus='Completed'
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    dispatch(setState(order,newStatus))
  };

  const handleBack = () => {
    activeStep===3?newStatus='In Progress':newStatus='Pending'
    setActiveStep((prevActiveStep) => prevActiveStep - 1);    
    dispatch(setState(order,newStatus))
  };

  const handleReset = () => {
    newStatus='Pending'
    setActiveStep(1);    
    dispatch(setState)
    dispatch(setState(order,newStatus))
  };

  return (
    <Box sx={{ width: '70%' }} className={style.globalContainer}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Sale completed successfully!
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep+1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}