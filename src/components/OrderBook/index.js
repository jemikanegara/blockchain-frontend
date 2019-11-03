import React from 'react';
import styled from 'styled-components'
import MarketHeader from '../MarketHeader'

const OrderBook = () => {
    const Container = styled.div`
        display: flex;
        flex-direction: column;
        background: rgb(24, 24, 33);
        flex: 1 1 0%;
        border-color: rgb(49, 49, 71);
        border-style: solid;
        border-width: 0px 1px 1px 0px;
        padding: 24px 16px 16px;
        overflow: hidden;

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
        }
    `

    const HeadRight = styled.div`
        width: auto;
        padding: 8px 12px;

        button {
            cursor: pointer;
            font-weight: inherit;
            color: rgb(255, 255, 255);
            font-size: 0.6875rem;
            height: 24px;
            line-height: 1.5rem;
            min-width: 24px;
            text-align: center;
            vertical-align: middle;
            background: none rgb(24, 24, 33);
            border: none;
            outline: none;
            border-radius: 3px;
            font-size: 18px;
        }

        button:not(:last-child) {
            margin-right: 3px;
        }
    `

    return (
        <Container>
            <MarketHeader>
                <h2>Order Book</h2>
                <HeadRight>
                    <button>-</button>
                    <button>+</button>
                </HeadRight>
            </MarketHeader>
        </Container>
    )
}

export default OrderBook;