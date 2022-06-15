import React, { FC, useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker";
import { convertCurrencies, getAllCurrencies, getCurrencyHistory } from "../api/currencies";

const getDates = () =>{
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);

  return { firstDay, lastDay }
}

const History: FC<HistoryProps> = ({ setPage }) => {
  const [allCurrencies, setAllCurrencies] = useState<string[]>([]);
  const [currencyFrom, setCurrencyFrom] = useState<string>('EUR');
  const [currencyTo, setCurrencyTo] = useState<string>('USD');
  const [startDate, setStartDate] = useState<Date>(getDates().firstDay);
  const [endDate, setEndDate] = useState<Date>(getDates().lastDay);
  const [history, setHistory] = useState<any>({});

  const setAllCurrenciesFromRequest = async () => setAllCurrencies(await getAllCurrencies())
  const getHistory = async () => setHistory(await getCurrencyHistory(startDate, endDate, currencyFrom, currencyTo));

  useEffect(() => {
    setAllCurrenciesFromRequest();
  }, [])

  return (
    <div>
      <div>
        <button className="back-button" onClick={() => setPage(0)}>Back</button>
        <div className='exchange'>
          <div className="filters">
            <ReactDatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
            <select value={currencyFrom} onChange={(value) => setCurrencyFrom(value.target.value)}>
              {Object.keys(allCurrencies).map((c: any) =>
                <option value={c}>{allCurrencies[c]}</option>
                )}
            </select>
          </div>
          <div className="filters">
            <ReactDatePicker selected={endDate} onChange={(date: Date) => setEndDate(date)} />
            <select value={currencyTo} onChange={(value) => setCurrencyTo(value.target.value)}>
              {Object.keys(allCurrencies).map((c: any) =>
                <option value={c}>{allCurrencies[c]}</option>
              )}
            </select>
          </div>
        </div>
        <button onClick={() => getHistory()}>Find</button>
      </div>
      <div className='rates'>
        <table>
          <tbody>
            {Object.keys(history).map((r: any) =>
              <tr>
                <td>{r} - </td>
                <td>{currencyTo}: {history[r][currencyTo]}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface HistoryProps {
  setPage: (page: number) => void
}

export default History