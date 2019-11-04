import React from 'react';
import styled from "styled-components"
import MarketHeader from '../MarketHeader'

const MarketHistory = () => {
    const Container = styled.div`
        border-color: rgb(49, 49, 71);
        border-style: solid;
        border-width: 0px 1px 1px 0px;
        padding: 24px 16px 16px;
        background: rgb(24, 24, 33);

        h2 {
            display: flex;
            align-items: center;
            font-weight: 500;
            font-size: 0.8125rem;
            font-family: GraphikCondensed, -apple-system, BlinkMacSystemFont, sans-serif;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            white-space: nowrap;
            padding: 0px 12px;
            margin: 0px;
            line-height: 2.5rem;
        }
    `

    const HeadRow = styled.div`
        display: flex;

        div {
            width: 33%;
            margin: 0 10px 8px 0;
            border-bottom: 1px solid rgb(49, 49, 71);
        }

        div>span {
            padding: 16px 0 8px;
            font-size: 0.75rem;
            letter-spacing: 1px;
            text-transform: uppercase;
            text-align: right;
            color: #fff;
            display: block;
        }
    `

    return (<Container>
        <MarketHeader>
            <h2>Market History</h2>
        </MarketHeader>
        <HeadRow>
            <div><span>Price (ETH)</span></div>
            <div><span>Size</span></div>
            <div><span>When</span></div>
        </HeadRow>
    </Container>)
}

export default MarketHistory;