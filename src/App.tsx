import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import Exchange from './components/Exchange';
import History from './components/History';
import Menu from './components/Menu';
import Rate from './components/Rate';

const App = () => {
  const [page, setPage] = useState(0);

  return (
    <div className="App">
      {page === 0 && <Menu setPage={setPage}/>}
      {page === 1 && <Rate setPage={setPage}/>}
      {page === 2 && <Exchange setPage={setPage}/>}
      {page === 3 && <History setPage={setPage}/>}
    </div>
  );
}

export default App;
