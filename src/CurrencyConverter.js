import React, { useState, useEffect } from 'react';
import { data } from './data/data';
import axios from 'axios';
import NumberFormat from 'react-number-format';

const API_KEY = `${process.env.REACT_APP_API_KEY}`;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair`;

const CurrencyConverter = () => {
  const [ formData, setFormData ] = useState({
    convertFrom: 'USD',
    convertTo: 'GBP',
    amount: ''
  });
  const [ conversionRate, setConversionRate ] = useState(null);
  const [ error, setError ] = useState([]);

  // handles changes in formData and will asign any new values
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((item) => ({ ...item, [name]: value }));
  }

  /**
   * handleSubmit will be executed any time that information in the ConvertFrom, ConvertTo, or amount changes
   * If useEffect detets changes in vakues a new API call will be requested with the changed data.
   */
  useEffect(
    () => {
      async function handleSubmit() {
        console.log(formData);
        if (formData.amount !== '') {
          try {
            const res = await axios.get(`${BASE_URL}/${formData.convertFrom}/${formData.convertTo}/${formData.amount}`);
            let twoDecimalNum = Math.round(res.data.conversion_result * 100) / 100;
            setConversionRate(twoDecimalNum);
          } catch (e) {
            setError(e.message);
          }
        } else {
          setConversionRate('');
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
          <h2 className="amt-total">Total: </h2>
          {isNaN(conversionRate) ? '' : <p className="amt-total">{conversionRate}</p>}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
