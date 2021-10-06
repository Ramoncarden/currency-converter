import React, { useState } from 'react';

// const API_KEY = '763227896404298e9c6bc780';
// const BASE_URL = 'https://v6.exchangerate-api.com/v6/63227896404298e9c6bc780/latest/USD';

const CurrencyConverter = () => {
  const [ formData, setFormData ] = useState({
    convertFrom: 'USD',
    convertTo: 'GBP',
    amount: ''
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(formData);
  }

  return (
    <div>
      <h1>Currency Converter</h1>
      <div className="convert-container">
        <form onSubmit={handleSubmit}>
          <div className="convert-select">
            <div className="left-select">
              <label className="select-input">Convert From: </label>
              <select value={formData.convertFrom} onChange={handleChange}>
                <option value="USD">USD</option>
              </select>
            </div>

            <div className="right-select">
              <label className="select-input">Convert To: </label>
              <select value={formData.convertTo} onChange={handleChange}>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>

          <div className="convert-amount">
            <label htmlFor="amount" className="amount">
              Amount:
            </label>
            <input
              name="amount"
              id="amount"
              type="text"
              placeholder="Please enter amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-grad">
            Convert
          </button>
        </form>
        <div className="result-area">
          <h2>The result is: </h2>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
