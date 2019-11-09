import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { MarketHeader } from '../SharedStyling'
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import thousandSeparator from "../../thousandSeparator"

const OrderBook = () => {
    const dataMockup = {
        price: 0,
        amount: 0
    }

    const ORDER_BOOK = gql`
        {
            orderBook(
                limit: 20,
                selling: "native",
                buying: "ETH-GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5"
            ){
                bids {
                    price
                    amount
                }
                asks {
                    price
                    amount
                }
            }
        }
    `


    const { loading, error, data } = useQuery(ORDER_BOOK)
    const [bids, setBids] = useState([dataMockup])
    const [asks, setAsks] = useState([dataMockup])
    const [spread, setSpread] = useState(0)

    useEffect(() => {
        if (!loading && !error) {
            const { orderBook: { asks, bids } } = data
            asks.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            bids.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            setBids(bids)
            setAsks(asks)
        }
    }, [loading, error, data])

    useEffect(() => {
        if (!loading && !error) {
            let newSpread = asks[asks.length - 1].price - bids[bids.length - 1].price
            setSpread(newSpread)
        }
    }, [asks, bids, loading, error])


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

    const DataWrap = styled.div`
        max-height: 200px;
        overflow-y: scroll;
        overflow-x: hidden;
        
        ::-webkit-scrollbar {
            width: 5px;
            background: #313147;
        }
    `

    const BodyRow = styled(HeadRow)`
        div {
            border: none;
        }

        div>span {
            font-size: 0.5625rem;
            line-height: 1.25rem;
            padding: 0;
        }
    `

    const SpreadRow = styled.div`
        margin: 8px 8px 16px 0;
        font-size: 0.5625rem;
        line-height: 1.25rem;
        padding: 0;
        display: flex;
        justify-content: space-between;

        div:first-child {
            color: rgb(131, 132, 143);
            text-align: left;
        }

        div:last-child {
            color: #fff;
            text-align: right;
        }

        div:last-child>span:not(:first-child) {
            margin-left: 8px;
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

            <HeadRow>
                <div><span>Size (XLM)</span></div>
                <div><span>Sum</span></div>
                <div><span>Price (ETH)</span></div>
            </HeadRow>
            {
                data &&
                <DataWrap>
                    {
                        asks.map((ask, i) => {
                            const previousAmount = i < 1 ? 0 : asks[i - 1].amount
                            const sumTotal = +ask.amount + +previousAmount
                            const sumValue = thousandSeparator(sumTotal)
                            const price = (+ask.price).toFixed(7)
                            return (
                                <BodyRow key={`ask-${i}`}>
                                    <div><span>{thousandSeparator(ask.amount)}</span></div>
                                    <div><span>{sumValue}</span></div>
                                    <div><span>{price}</span></div>
                                </BodyRow>
                            )
                        })
                    }
                    <SpreadRow>
                        <div>Spread (XLM)</div>
                        <div><span>{spread.toFixed(3)}</span> <span>{(spread * 100).toFixed(3)}{`%`}</span></div>
                    </SpreadRow>
                    {
                        bids.map((bid, i, arr) => {
                            const previousAmount = i < 1 ? 0 : bids[i - 1].amount
                            const sumTotal = +bid.amount + +previousAmount
                            const sumValue = thousandSeparator(sumTotal)
                            const price = (+bid.price).toFixed(7)
                            return (
                                <BodyRow key={`bid-${i}`}>
                                    <div><span>{thousandSeparator(bid.amount)}</span></div>
                                    <div><span>{sumValue}</span></div>
                                    <div><span>{price}</span></div>
                                </BodyRow>
                            )
                        })
                    }
                </DataWrap>
            }


        </Container>
    )
}

export default OrderBook;