import React, { useState, useEffect } from 'react';
import { data } from './data/data';
import axios from 'axios';
import NumberFormat from 'react-number-format';

// TODO make API key into ENVIRONMENTAL VARIABLE
const API_KEY = '763227896404298e9c6bc780';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair`;
//v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP

const CurrencyConverter = () => {
  const [ formData, setFormData ] = useState({
    convertFrom: 'USD',
    convertTo: 'GBP',
    amount: ''
  });
  const [ conversionRate, setConversionRate ] = useState(null);
  const [ error, setError ] = useState([]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((item) => ({ ...item, [name]: value }));
  }

  /*   async function handleSubmit(evt) {
    if (formData.amount !== '' || '') {
      try {
        const res = await axios.get(`${BASE_URL}/${formData.convertFrom}/${formData.convertTo}/${formData.amount}`);
        let twoDecimalNum = Math.round(res.data.conversion_result * 100) / 100;
        setConversionRate(twoDecimalNum);
      } catch (e) {
        setError(e.message);
      }
    } else {
      setFormData[formData.amount] = 0;
    }
  } */

  // const numForAmt = (evt) => {
  //   // const re = /[+-]?\d+(?:[.,]\d+)?/;
  //   const re = ^/(?!0\.00)[1-9]\d{0,2}(,\d{3})*(\.\d\d)?$/;
  //   if (!re.test(evt.key)) {
  //     evt.preventDefault();
  //   }
  // };

  // Render component and make api call everytime state in formData changes.
  useEffect(
    () => {
      async function handleSubmit(evt) {
        if (formData.amount !== '') {
          try {
            const res = await axios.get(`${BASE_URL}/${formData.convertFrom}/${formData.convertTo}/${formData.amount}`);
            let twoDecimalNum = Math.round(res.data.conversion_result * 100) / 100;
            setConversionRate(twoDecimalNum);
          } catch (e) {
            setError(e.message);
          }
        } else {
          setFormData[formData.amount] = '';
        }
      }
      handleSubmit();
    },
    [ formData ]
  );

  return (
    <div>
      <h1>Currency Converter</h1>
      <div className="convert-container">
        <form>
          <div className="convert-select">
            <div className="left-select">
              <label htmlFor="convertFrom" className="select-input">
                Convert From:{' '}
              </label>
              <select value={formData.convertFrom} name="convertFrom" onChange={handleChange}>
                {data.map((item) => (
                  <option value={item.code} key={item.name}>
                    {item.code}
                  </option>
                ))}
              </select>
            </div>

            <div className="right-select">
              <label htmlFor="converTo" className="select-input">
                Convert To:{' '}
              </label>
              <select value={formData.convertTo} name="convertTo" onChange={handleChange}>
                {data.map((item) => (
                  <option value={item.code} key={item.name}>
                    {item.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="convert-amount">
            <label htmlFor="amount" className="amount">
              Amount:
            </label>
            {/*             <input
              name="amount"
              id="amount"
              type="number"
              required
              maxLength={9}
              placeholder="Please enter amount"
              value={formData.amount}
              onChange={handleChange}
            /> */}
            <NumberFormat
              name="amount"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Please enter amount"
              allowNegative={false}
              displayType="input"
              allowLeadingZeros={false}
              maxLength={9}
              isNumericString={true}
              title="Please enter a valid number"
            />
          </div>

          {error && <div>{error}</div>}
        </form>
        <div className="result-area">
          <h2>Total: </h2>
          {isNaN(conversionRate) ? '' : <p className="amt-total">{conversionRate}</p>}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
