import React, { FC, useEffect, useState } from "react"
import { convertCurrencies, getAllCurrencies } from "../api/currencies";

const Exchange: FC<ExchangeProps> = ({ setPage }) => {
  const [allCurrencies, setAllCurrencies] = useState<string[]>([]);
  const [currencyFrom, setCurrencyFrom] = useState<string>('EUR');
  const [currencyTo, setCurrencyTo] = useState<string>('USD');
  const [currencyFromValue, setCurrencyFromValue] = useState<number>(0);
  const [currencyToValue, setCurrencyToValue] = useState<number>(0);

  const setAllCurrenciesFromRequest = async () => setAllCurrencies(await getAllCurrencies())
  const convert = async () => setCurrencyToValue(await convertCurrencies(currencyFrom, currencyTo, currencyFromValue.toString()))

  useEffect(() => {
    setAllCurrenciesFromRequest();
  }, [])

  useEffect(() => {
    convert()
  }, [currencyFromValue])

  return (
    <div>
      <button className="back-button" onClick={() => setPage(0)}>Back</button>
      <div className='exchange'>
        <div>
          <input value={currencyFromValue} onChange={(value) => setCurrencyFromValue(+value.target.value)}></input>
          <select value={currencyFrom} onChange={(value) => setCurrencyFrom(value.target.value)}>
            {Object.keys(allCurrencies).map((c: any) =>
              <option value={c}>{allCurrencies[c]}</option>
            )}
          </select>
        </div>
        <div>
          <input value={currencyToValue} onChange={(value) => setCurrencyToValue(+value.target.value)}></input>
          <select value={currencyTo} onChange={(value) => setCurrencyTo(value.target.value)}>
            {Object.keys(allCurrencies).map((c: any) =>
              <option value={c}>{allCurrencies[c]}</option>
            )}
          </select>
        </div>
      </div>
    </div>
  )
}

interface ExchangeProps {
  setPage: (page: number) => void
}

export default Exchange