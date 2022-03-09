import './App.css';
import SideBar from './components/shared/SideBar';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import Promotions from './components/promotions/Promotions'
import PromotionDetails from './components/promotions/PromotionDetails'

function App() {
  return (
    <div className="App">
    <Router>
      <SideBar/>
      <Routes>
        <Route path='*' element={<PageNotFound/>}/>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/promotions' element={<Promotions/>}/>
        <Route exact path='/promotions/:id' element={<PromotionDetails/>}/>
      </Routes>
    </Router>

    </div>
  );
}

export default App;
