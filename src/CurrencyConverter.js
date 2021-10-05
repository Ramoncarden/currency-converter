import React from 'react';

const API_KEY = '63227896404298e9c6bc780';

function handleSubmit(e) {
  console.log(e);
}

const CurrencyConverter = () => {
  return (
    <div>
      <h1>Currency Converter</h1>
      <div className="convert-container">
        <form action="" onSubmit={handleSubmit}>
          <label>Amount: </label>
          <input type="text" />
          <button type="submit" className="btn-grad">
            Convert
          </button>
        </form>
        <div className="result-area">The result is:</div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
