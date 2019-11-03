import React from 'react';
import styled from 'styled-components'
import MarketHeader from '../MarketHeader'

const Chart = () => {
    const Container = styled.div`
        background: rgb(24, 24, 33);
        border-color: rgb(49, 49, 71);
        border-style: solid;
        border-width: 0px 1px 1px 0px;
        padding: 24px 16px 16px;
        flex: 1 1 0%;
        overflow: hidden;

        nav {
            display: flex;
            justify-content: flex-start;

            button {
                padding: 12px;
                font-weight: 500;
                font-size: 0.8125rem;
                font-family: GraphikCondensed, -apple-system, BlinkMacSystemFont, sans-serif;
                letter-spacing: 1.5px;
                text-transform: uppercase;
                white-space: nowrap;
                position: relative;
                height: 2.5rem;
                color: rgb(255, 255, 255);
                padding: 0px 12px;
                margin: 0px;
                display: flex;
                align-items: center;
                text-decoration: none;         
                background: none;
                border: none;
                cursor: pointer;       
            }
        }
    `

    const RightHead = styled.div`
        position: relative;

        select {
            height: 24px;
            padding-right: 14px;
            -webkit-appearance: none;
            color: rgb(255, 255, 255);
            letter-spacing: 0.0937rem;
            width: 100%;
            background: none;
            border: none;
            outline: none;
            padding: 0px;
            display: inline-block;
            position: relative;
            min-width: 102px;
            font-size: 0.75rem;
            box-shadow: rgb(49, 49, 71) 0px 0px 0px 1px inset;
            background: rgb(24, 24, 33);
            border-radius: 2px;
            padding: 0px 18px 0 12px;
            width: auto;
            margin: 5px 0;
            height: 30px;
        }
        
        span {
            display: block;
            position: absolute;
            top: 30%;
            right: 9px;
            margin-top: -4px;
        }
    `
    return (<Container>
        <MarketHeader>
            <nav><button>Candlestick</button>
                <button>Line Chart</button>
                <button>Market Depth</button>
            </nav>
            <RightHead>
                <select>
                    <option value="0">1H @ 1M intervals</option>
                    <option value="1">6H @ 5M intervals</option>
                    <option value="2">1D @ 30M intervals</option>
                    <option value="3">7D @ 3H intervals</option>
                    <option value="4">14D @ 6H intervals</option>
                    <option value="5">30D @ 12H intervals</option>
                    <option value="6">90D @ 1D intervals</option>
                    <option value="7">52W @ 1W intervals</option>
                </select>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24"><path fill="#fff" fillRule="evenodd" d="M12 13.999L2 4v5.656l10 10 10-10V4z"></path></svg></span>
            </RightHead>
        </MarketHeader>
    </Container>)
}

export default Chart;