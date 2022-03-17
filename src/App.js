
import './App.css';
import SideBar from './components/shared/SideBar';
import { ConfirmProvider } from 'material-ui-confirm';
import * as React from 'react';


function App() {
  return (
    <ConfirmProvider>
     <SideBar />
  </ConfirmProvider>
  );
};

export default App;
