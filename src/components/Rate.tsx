import React, { FC, useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker"
import { getAllCurrencies, getCurrencyByDate } from "../api/currencies";

const Rate: FC<RateProps> = ({ setPage }) => {
  const [allCurrencies, setAllCurrencies] = useState<string[]>([]);

  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [currencyRate, setCurrencyRate] = useState<any>({});


  const getCurrency = async (date: Date, base: string) => setCurrencyRate(await getCurrencyByDate(date, base));
  const setAllCurrenciesFromRequest = async () => setAllCurrencies(await getAllCurrencies())


  useEffect(() => {
    setAllCurrenciesFromRequest();
  }, [])

  return (
    <div>
      <button className="back-button" onClick={() => setPage(0)}>Back</button>
      <div className='filters'>
        <ReactDatePicker selected={selectedDate} onChange={(date: Date) => setSelectedDate(date)} />
        <select value={selectedCurrency} onChange={(value) => setSelectedCurrency(value.target.value)}>
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
    </div>
  )
}

interface RateProps {
  setPage: (page: number) => void
}

export default Rate