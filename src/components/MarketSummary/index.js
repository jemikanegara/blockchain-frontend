import React from 'react';
import styled from 'styled-components'

const MarketSummary = () => {
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
                    <strong>6.2931677</strong>
                    <strong>ETH</strong>
                </Volume>
            </div>
            <div>
                <span className="title">Last price per XLM</span>
                <LastPrice>
                    <strong>0</strong>
                    <strong>ETH</strong>
                </LastPrice>
            </div>
            <div>
                <span className="title">24h Change</span>
            </div>
        </Container>
    )
}

export default MarketSummary;