import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };
  return (
    <div className="w-full h-screen flex">
      <div
        className="w-1/2 h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1629172/pexels-photo-1629172.jpeg')`,
        }}
      ></div>
      <div className="w-1/2 h-full flex flex-col justify-center items-center bg-amber-50 p-5">
        <h1 className="mb-4 text-2xl font-serif">
          Check Your Country Currency Worth
        </h1>
        <div className="w-full max-w-md border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onAmountChange={(e) => {
                  setAmount(e);
                }}
                onCurrencyChange={(e) => {
                  setFrom(e);
                }}
                selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 
                border-2 border-white rounded-md bg-orange-700 text-white px-2 py-0.5 cursor-pointer"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                onAmountChange={(e) => {
                  setAmount(e);
                }}
                onCurrencyChange={(e) => {
                  setTo(e);
                }}
                amount={convertedAmount}
                currencyOptions={options}
                selectCurrency={to}
                amountdisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-700 text-white px-4 py-3 rounded-lg cursor-pointer"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
