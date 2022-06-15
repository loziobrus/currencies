import axios from 'axios'
import moment from 'moment'

const api = 'https://api.apilayer.com/exchangerates_data'
axios.defaults.headers.get['apikey'] = 'ykPH8cZyTG6Ib9vxu7gE5a0wjjtYeDGG'

const getFormattedDate = (date: Date) => moment(date).format('YYYY-MM-DD');

export const getCurrencyByDate = async (date: Date, base: string) => (await axios.get(`${api}/${getFormattedDate(date)}?base=${base}`, )).data.rates

export const getAllCurrencies = async () => (await axios.get(`${api}/symbols`, )).data.symbols

export const convertCurrencies = async (from: string, to: string, amount: string) => (await axios.get(`${api}/convert?from=${from}&to=${to}&amount=${amount}`)).data.result

export const getCurrencyHistory = async (startDate: Date, endDate: Date, base: string, target: string) => (await axios.get(`${api}/timeseries?start_date=${getFormattedDate(startDate)}&end_date=${getFormattedDate(endDate)}&base=${base}&symbols=${target}`)).data.rates