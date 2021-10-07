import React from 'react';
import { data } from './data/data';

const CurrencyList = () => {
  return (
    <div className="table-container">
      <h2 className="supported-currencies">Supported Currencies</h2>
      <table>
        <colgroup span="2" />
        <thead>
          <tr>
            <th>Currency Code</th>
            <th>Currency Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={`${data.code}`}>
              <td>{data.code}</td>
              <td>{data.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyList;
