import React, { useEffect, useState } from 'react';
import { getAllCurrencies, getCurrencyByDate } from './api/currencies';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

const App = () => {
  const [allCurrencies, setAllCurrencies] = useState<string[]>([]);

  const [selectedCurrency, setSelectedCurrency] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [currencyRate, setCurrencyRate] = useState<any>({});


  const getCurrency = async (date: Date, base: string) => setCurrencyRate(await getCurrencyByDate(date, base));
  const setAllCurrenciesFromRequest = async () => setAllCurrencies(await getAllCurrencies())


  useEffect(() => {
    setAllCurrenciesFromRequest();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div className='filters'>
          <DatePicker selected={selectedDate} onChange={(date: Date) => setSelectedDate(date)} />
          <select onChange={(value) => setSelectedCurrency(value.target.value)}>
            {Object.keys(allCurrencies).map((c: any) =>
              <option value={c}>{allCurrencies[c]}</option>
            )}
          </select>
          <button onClick={() => getCurrency(selectedDate, selectedCurrency)}>Find</button>
        </div>
        <div className='rates'>
          <table>
            <tbody>
              {Object.keys(currencyRate).map((r: any) =>
                <tr>
                  <td>{r}</td>
                  <td>{currencyRate[r]}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
