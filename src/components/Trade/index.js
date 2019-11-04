import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';

const Trade = () => {
    const BESTBUY_BESTSELL = gql`
        {
            tick(
                selling: "native"
                buying: "ETH-GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5"
            ) {
            bestBuy: bestAsk
            bestSell: bestBid
            }
        }
    `
    const { loading, error, data } = useQuery(BESTBUY_BESTSELL);

    // Active State
    const BUY = "BUY"
    const SELL = "SELL"
    const [activeButton, setActiveButton] = useState(BUY)
    const changeActive = (value) => {
        setActiveButton(value)
    }

    // Buy or Sell
    const [bestSell, setBestSell] = useState(0)
    const [bestBuy, setBestBuy] = useState(0)
    const [Qty, setQty] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (!loading && !error) {
            const { tick: { bestSell, bestBuy } } = data
            setBestSell(bestSell.toFixed(7))
            setBestBuy(bestBuy.toFixed(7))
        }
    }, [data, loading, error])

    // Styling
    const Container = styled.div`
        flex: 0 0 auto;
        background: rgb(24, 24, 33);
        border-color: rgb(49, 49, 71);
        border-style: solid;
        border-width: 0px 1px 1px 0px;
        padding: 24px 16px 16px;
    `

    const Head = styled.div`
        display: flex;
        position: relative;
        background: rgb(86, 86, 107);
        border-radius: 2px;
    `

    const HeadButton = styled.button`
        height: 40px;
        text-align: center;
        color: rgb(255, 255, 255);
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 2.5px;
        line-height: 2rem;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        outline: none;
        padding: 0px;
        margin: 4px;
        border-radius: 2px;
        flex: 1 1 0%;
        background: none;
        border: none;
        cursor: pointer;

        :hover {
            background-color: rgb(49, 49, 71);
        }

        &.active {
            background-color: rgb(15, 15, 20)!important;
        }
    `

    const Form = styled.form`
        margin-top: 16px;
        position: relative;
        display: flex;
        flex-direction: column;
        margin-bottom: 4px;
    `

    const FormLabel = styled.label`
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: rgb(66, 67, 89) 0px 0px 0px 1px inset;
        flex: 0 1 auto;
        margin: 0px 0px 8px;
        padding: 12px 16px;
        border-radius: 2px;
        background: rgb(24, 24, 33);

        span:first-child {
            flex: 0 0 auto;
            margin-right: 8px;
            color: #fff;
        }

        span:last-child {
            font-family: "Roboto Mono", Monaco, Consolas, monospace;
            line-height: 2rem;
            flex: 0 0 56px;
            font-size: 1rem;
            width: 56px;
            text-align: right;
            margin-left: 8px;
            white-space: nowrap;
            color: rgb(255, 255, 255);
            overflow: hidden;
        }

        input {
            font-family: "Roboto Mono", Monaco, Consolas, monospace;
            line-height: 2rem;
            margin-left: auto;
            font-size: 1rem;
            color: rgb(255, 255, 255);
            text-align: right;
            width: 100%;
            min-width: 0px;
            background: none;
            outline: none;
            padding: 0px;
            border: none;
        }

        button {
            cursor: pointer;
            text-align: inherit;
            font-weight: 500;
            font-size: 0.75rem;
            line-height: 1.5rem;
            color: rgb(255, 255, 255);
            background: none;
            border-width: initial;
            border-style: none;
            border-color: initial;
            border-image: initial;
            outline: none;
            padding: 0px;
            margin: 0px 0px 0px 8px;
            text-decoration: underline;
        }
    `

    const LoginButton = styled.button`
        display: inline-block;
        cursor: pointer;
        text-align: center;
        width: 100%;
        font-size: 0.75rem;
        letter-spacing: 2.5px;
        font-weight: 600;
        text-transform: uppercase;
        height: 56px;
        line-height: 2rem;
        min-width: 56px;
        color: rgb(49, 49, 71);
        outline: none;
        margin: 0px;
        text-decoration: none;
        border-radius: 2px;
        padding: 12px 24px;
        background: rgb(255, 217, 112);
        border: none;

        :hover {
            color: rgb(66, 67, 89);
            background: rgb(255, 224, 138);
        }
    `

    return (
        <Container>
            <Head>
                <HeadButton
                    className={activeButton === BUY ? "active" : ""}
                    onClick={() => {
                        changeActive(BUY)
                    }} >
                    Buy
                </HeadButton>
                <HeadButton
                    className={activeButton === SELL ? "active" : ""}
                    onClick={() => {
                        changeActive(SELL)
                    }}>
                    Sell
                </HeadButton>
            </Head>
            <Form>
                <FormLabel>
                    <span>Unit Price</span>
                    <input
                        type="text"
                        pattern="\d*\.?\d*"
                        placeholder="0.00"
                        name="price"
                        autoComplete="off"
                        value={activeButton === BUY ? bestBuy : bestSell}
                        onChange={e => {
                            activeButton === BUY ?
                                setBestBuy(e.target.value) :
                                setBestSell(e.target.value)
                        }
                        }>
                    </input>
                    <span>ETH</span>
                </FormLabel>
                <FormLabel>
                    <span>Qty {
                        activeButton === BUY ?
                            <button>Buy Max</button>
                            :
                            <button>Sell Max</button>
                    }</span>
                    <input
                        type="text"
                        pattern="\d*\.?\d*"
                        placeholder="0.00"
                        name="price"
                        autoComplete="off"
                        value={Qty}
                        onChange={e => {
                            setQty(e.target.value)
                        }}
                    ></input>
                    <span>XLM</span>
                </FormLabel>
                <FormLabel>
                    <span>Total</span>
                    <input
                        type="text"
                        pattern="\d*\.?\d*"
                        placeholder="0.00"
                        name="price"
                        autoComplete="off"
                        value={total}
                        onChange={e => {
                            setTotal(e.target.value)
                        }}
                    ></input>
                    <span>ETH</span>
                </FormLabel>
            </Form>
            <LoginButton href="/login">
                Log in to trade
            </LoginButton>
        </Container>
    )
}

export default Trade