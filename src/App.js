import React from 'react';
import './App.css'
import Header from './components/Header'
import CurrencyBar from './components/CurrencyBar'
import Trade from './components/Trade';
import OpenOrders from './components/OpenOrders';
import MarketSummary from './components/MarketSummary';
import Chart from './components/Chart';
import OrderBook from './components/OrderBook';
import MarketHistory from './components/MarketHistory';


const App = () => {
  return (
    <div className="App">
      <Header />
      {/* <CurrencyBar />
      <main className="App__Main">
        <div className="App__Left">
          <Trade />
          <OpenOrders />
        </div>
        <div className="App__Middle">
          <MarketSummary />
          <Chart />
        </div>
        <div className="App__Right">
          <OrderBook />
          <MarketHistory />
        </div>
      </main> */}
    </div>
  )
}

export default App;
