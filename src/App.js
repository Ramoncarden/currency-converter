import './App.css';
import CurrencyConverter from './CurrencyConverter';

function App() {
  return (
    <div className="App">
      <article>
        1. User can enter up to 9 digits to represent the amount to convert in a source input field 2. User can view a
        sorted list of available currencies and select the currency to convert from in a source drop-down list 3. User
        can view a sorted list of available currencies and select the currency to convert to in a destination drop-down
        list 4. User views the value (rounded to two decimal places) of the source amount converted to the destination
        currency in a single output field as soon as either the input value, the source currency, or the destination
        currency is changed. 5. User must be alerted if the input is not a number
      </article>

      <CurrencyConverter />
    </div>
  );
}

export default App;
