import styled from 'styled-components'

export const Container = styled.div`
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
                color: #d0cfcc;
                padding: 0px 12px;
                margin: 0px;
                display: flex;
                align-items: center;
                text-decoration: none;         
                background: none;
                border: none;
                cursor: pointer; 
                outline: none;      
            }

            button:hover,
            button.active {
                color: #fff;
            }

            button.active::before{
                content: "";
                width: 6px;
                height: 6px;
                position: absolute;
                left: 0px;
                top: 50%;
                margin-top: -3px;
                background: rgb(255, 255, 255);
                border-radius: 50%;
            }
        }
    `

export const RightHead = styled.div`
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

export const MarketChart = styled.div`
        color: #fff;
        margin-top: 10px;
        height: 500px;
    `