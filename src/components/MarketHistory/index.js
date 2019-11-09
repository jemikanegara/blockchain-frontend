import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import { MarketHeader } from '../SharedStyling'
import { gql } from "apollo-boost"
import { useLazyQuery } from "@apollo/react-hooks"
import thousandSeparator from "../../thousandSeparator"


const MarketHistory = () => {
    const history = {
        id: "",
        price: 0,
        baseAmount: 0,
        baseAsset: {
            id: "",
            code: ""
        },
        counterAsset: {
            id: "",
            code: ""
        },
        ledgerCloseTime: ""
    }

    const MARKET_HISTORY = gql`
        query ($before: String) {
            trades(
                before: $before,
                last: 20, 
                baseAsset: "native", 
                counterAsset: "ETH-GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5"
            )   {
                pageInfo {
                    startCursor
                    endCursor
                }
                nodes {
                    id
                    price
                    baseAmount
                    baseAsset{
                        id
                        code
                    }
                    counterAsset {
                        id
                        code
                    }
                    ledgerCloseTime
                }
            }
        }
    `
    // Pagination
    const [before, setBefore] = useState("")

    // Market History
    const [marketHistory, setMarketHistory] = useState([history])

    // Lazy Query History Fetching (will automatically run when variable change)
    const [loadMarketHistory, { called, loading, error, data }] = useLazyQuery(MARKET_HISTORY, { variables: { before } })

    useEffect(() => {
        setMarketHistory([])
        loadMarketHistory()
    }, [])

    useEffect(() => {
        if (data) {
            const { trades: { nodes } } = data
            setMarketHistory([...marketHistory, ...nodes])
        }
    }, [data])

    const loadMoreMarket = () => {
        const { trades: { pageInfo: { endCursor } } } = data
        setBefore(endCursor)
    }

    const timeDifferenceCheck = (day, hour, minute) => {
        if (minute >= 1 && minute < 60) {
            return minute + 'm'
        } else
            if (hour >= 1 && hour < 60) {
                return hour + 'h'
            } else
                if (day >= 1 && day < 7) {
                    return day + 'd'
                }
    }

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

    const DataWrap = styled.div`
        max-height: 200px;
        overflow-y: scroll;
        overflow-x: hidden;

        ::-webkit-scrollbar {
            width: 5px;
            background: #313147;
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

    const BodyRow = styled(HeadRow)`
        div {
            border: none;
        }

        div>span {
            font-size: 0.5625rem;
            line-height: 1.25rem;
            padding: 0;
        }

        div>span:last-child {
            text-transform: lowercase;
        }
    `

    const LoadMoreButton = styled.button`
        width: 100%;
        background: rgb(255,217,112);
        padding: 12px 24px;
        border: none;
        color: rgb(49,49,71);

        :hover {
            background: rgb(255,224,138);
        }
    `

    const LoadingMessage = styled.div`
        color: #fff;
        text-align: center;
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
        <DataWrap>
            {
                data && marketHistory.map(history => {

                    // Price
                    const priceCalculation = history.price.toFixed(7)
                    const price = thousandSeparator(priceCalculation)
                    // Size
                    const sizeCalculation = history.baseAmount * history.price.toFixed(7)
                    const size = thousandSeparator(sizeCalculation)
                    // When
                    const historyDate = new Date(history.ledgerCloseTime);
                    const timeDifference = new Date() - historyDate;
                    const day = parseInt(timeDifference / (60 * 60 * 24 * 1000))
                    const hour = parseInt(timeDifference / (60 * 24 * 1000))
                    const minute = parseInt(timeDifference / (60 * 1000))
                    const when = timeDifferenceCheck(day, hour, minute)

                    return (
                        <BodyRow key={history.id}>
                            <div><span>{price}</span></div>
                            <div><span>{size}</span></div>
                            <div><span>{when}</span></div>
                        </BodyRow>
                    )
                })
            }
        </DataWrap>

        {
            loading && (
                <LoadingMessage>Loading ...</LoadingMessage>
            )
        }

        {
            !loading && (
                <LoadMoreButton onClick={loadMoreMarket}>Load More</LoadMoreButton>
            )
        }
    </Container>)
}

export default MarketHistory;