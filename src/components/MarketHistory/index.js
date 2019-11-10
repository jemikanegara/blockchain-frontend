import React, { useState, useEffect, useRef } from 'react';
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
                last: 6, 
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

    // Data Wrap Reference
    const dataWrapEl = useRef(null)

    // Pagination
    const [before, setBefore] = useState("")

    // Market History
    const [marketHistory, setMarketHistory] = useState([history])

    // Lazy Query History Fetching (will automatically run when variable change)
    const [loadMarketHistory, { loading, data }] = useLazyQuery(MARKET_HISTORY, { variables: { before } })

    // Initialize
    useEffect(() => {
        setMarketHistory([])
        loadMarketHistory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Set Market History
    useEffect(() => {
        if (data) {
            const { trades: { nodes } } = data
            setMarketHistory([...marketHistory, ...nodes])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    // Scroll After Load
    useEffect(() => {
        if (marketHistory && dataWrapEl.current) {
            dataWrapEl.current.scrollTop = dataWrapEl.current.scrollHeight
        }
    }, [marketHistory, before])

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
            font-size: 11px;
            line-height: 1.25rem;
            padding: 0;
        }

        div>span:last-child {
            text-transform: lowercase;
        }

        div>span.up {
            color: rgb(63, 203, 224);
        }

        div>span.down {
            color: rgb(255, 139, 97);
        }

        svg {
            margin-right: 8px;
        }

        div>span.up>svg {
            transform: rotate(-45deg)
        }

        div>span.down>svg{
            transform: rotate(45deg)
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
        <DataWrap ref={dataWrapEl} id="abc">
            {
                data && marketHistory.map((history, i) => {
                    const isLastIndex = i === marketHistory.length - 1
                    if (isLastIndex) return null

                    // Price
                    const priceIsUp = history.price >= marketHistory[i + 1].price
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
                            <div>

                                <span className={priceIsUp ? "up" : "down"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
                                        <path fill={priceIsUp ? "#3fcbe0" : "#ff8b61"} fill-rule="evenodd" d="M14 2l5 5h-5.656l-5-5H14zM8.344 22l8-8H0v-4h22l2 2-10 10H8.344z"></path>
                                    </svg>
                                    {price}
                                </span>
                            </div>
                            <div><span>{size}</span></div>
                            <div><span>{when}</span></div>
                        </BodyRow>
                    )
                })
            }

            {
                !loading && (
                    <LoadMoreButton onClick={loadMoreMarket}>Load More</LoadMoreButton>
                )
            }

            {
                loading && (
                    <LoadingMessage>Loading ...</LoadingMessage>
                )
            }
        </DataWrap>
    </Container>)
}

export default MarketHistory;