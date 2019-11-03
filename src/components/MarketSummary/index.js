import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";

const client = new ApolloClient({
    uri: 'https://demo.astrograph.io/graphql',
});

const MarketSummary = () => {
    const tradeAggregation = {
        avg: 0,
        baseVolume: 0,
        close: 0,
        counterVolume: 0,
        high: 0,
        low: 0,
        open: 0,
        tradeCount: 37
    }

    const [marketData, setMarketData] = useState(tradeAggregation)
    useEffect(() => {
        client
            .query({
                query: gql`
                    query {
                    tradeAggregations(
                    last: 1 # 1 day
                    resolution: 86400000 # 24 hours
                    baseAsset: "native"
                    counterAsset: "ETH-GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5"
                ) {
                    tradeCount
                    baseVolume
                    counterVolume
                    avg
                    high
                    low
                    open
                    close
                    }   
                }
            `
            })
            .then(res => {
                const data = res.data.tradeAggregations[0]
                setMarketData(data)
            });
    }, [])

    const [priceChange, setPriceChange] = useState(0)
    useEffect(() => {
        let { open, close } = marketData
        let percentage = (close - open) / open
        setPriceChange(percentage)
    }, [marketData])

    const Container = styled.div`
        flex: 0 0 auto;
        background: rgb(24, 24, 33);
        border-color: rgb(49, 49, 71);
        border-style: solid;
        border-width: 0px 1px 1px 0px;
        padding: 24px 16px 24px;
        justify-content: space-around;
        display: flex;
        text-align: center;

        >div {
            display: flex;
            flex-direction: column-reverse;
            margin: 0px;
            padding: 0px;

            .title {
                color: rgb(192, 190, 188);
                font-size: 0.75rem;
                line-height: 0.75rem;
                margin: 0px;
                padding: 0px;
            }
        }
    `

    const Volume = styled.div`
        color: rgb(255, 255, 255);
        line-height: 1.25rem;
        margin: 0px;
        padding: 0px;

        strong:not(:last-child) {
            font-size: 1rem;
            font-weight: 500;
        }

        strong:last-child {
            font-size: 0.75rem;
            font-weight: 500;
            margin-left: 10px;
        }
    `

    const LastPrice = styled.div`
        color: rgb(255, 255, 255);
        line-height: 1.25rem;
        margin: 0px;
        padding: 0px;

        strong:not(:last-child) {
            font-weight: 500;
            font-size: 1.5rem
        }

        strong:last-child {
            font-weight: 500;
            font-size: 0.9375rem;
            margin-left: 10px;
        }
    `

    return (
        <Container>
            <div>
                <span className="title">24h Volume</span>
                <Volume>
                    <strong>{marketData && marketData.counterVolume}</strong>
                    <strong>ETH</strong>
                </Volume>
            </div>
            <div>
                <span className="title">Last price per XLM</span>
                <LastPrice>
                    <strong>{marketData && marketData.close.toFixed(0)}</strong>
                    <strong>ETH</strong>
                </LastPrice>
            </div>
            <div>
                <span className="title">24h Change</span>
                <div style={{ color: `${priceChange < 0 ? `rgb(255, 139, 97)` : `rgb(63, 203, 224)`}` }}>
                    {priceChange < 0 ? `-${priceChange.toFixed(2)}%` : `+${priceChange.toFixed(2)}%`}
                </div>
            </div>
        </Container>
    )
}

export default MarketSummary;