import React from 'react';
import './App.css';
import styled from 'styled-components';
import Header from './components/Header'
import CurrencyBar from './components/CurrencyBar'
import Trade from './components/Trade';
import TryStellar from './components/TryStellar'
import MarketSummary from './components/MarketSummary';
import Chart from './components/Chart';
import OrderBook from './components/OrderBook';
import MarketHistory from './components/MarketHistory';


const App = () => {

  const Main = styled.main`
      display: flex;
      justify-content: space-between;
  `

  const Left = styled.div`
      width: 350px;
  `

  const Right = styled.div`
      width: 325px;
  `

  const Middle = styled.div`
      flex-grow: 1;
  `

  return (
    <div className="App">
      <Header />
      <CurrencyBar />
      <Main>
        <Left>
          <Trade />
          <TryStellar />
        </Left>
        {/* <Middle>
          <MarketSummary />
          <Chart />
        </Middle>
        <Right>
          <OrderBook />
          <MarketHistory />
        </Right> */}
      </Main>
    </div>
  )
}

export default App;
