import { Box } from '@chakra-ui/react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import OnitoForm from './components/OnitoForm/OnitoForm';
import { Route, Routes } from 'react-router-dom';
import DataTable from './components/OnitoTable/DataTable';

function App() {
  return (
    <div>
      <Navbar />
      <Box paddingTop={"50px"}>
        <Routes>
          <Route path='/' element={<OnitoForm />} />
          <Route path='/table' element={<DataTable />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
