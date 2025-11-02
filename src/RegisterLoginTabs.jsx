import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Login from './login';
import ServerDown from './errors/ServerDown';
import PersonelInfoRegister from './personalnfoRegister';
import ContactInfoRegister from './contactInfoRegister';
import {AccountProvider} from './FormContext';
import { useError } from './errors/errorContext';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function RegisterService({tabValue}){
  const [registrarWizard, setRegistrarWizard] = React.useState(0);
  const {hasError} = useError();

  const handleWizardChange = (newStep) => {
    setRegistrarWizard(newStep);
  }

  if(hasError.type == "server")
    return <ServerDown />
  return(
      <AccountProvider>
        <CustomTabPanel value={tabValue} index={1}>
            {registrarWizard === 0 ? 
              <PersonelInfoRegister wizardStep ={handleWizardChange}></PersonelInfoRegister> :
              <ContactInfoRegister wizardStep ={handleWizardChange}></ContactInfoRegister>
            }
        </CustomTabPanel>
      </AccountProvider>
  ); 
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const {setHasError} = useError();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setHasError({
      type: null,
      messages: []
    });
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab className='login_registrar_tab' label="Giriş Yap" {...a11yProps(0)}   />
          <Tab className='login_registrar_tab' label="Müşteri Ol" {...a11yProps(1)}  />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Login></Login>
      </CustomTabPanel>
       <RegisterService tabValue={value}/>
    </Box>
  );
}