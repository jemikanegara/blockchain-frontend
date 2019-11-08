import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import MarketHeader from '../MarketHeader'
import CandleStick from './CandleStick'
import LineChart from './LineChart'
import MarketDepth from './MarketDepth'
import ReactEcharts from 'echarts-for-react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost"
import { renderItem } from './chartHelper'

const CANDLE_STICK = "CANDLE_STICK"
const LINE_CHART = "LINE_CHART"
const MARKET_DEPTH = "MARKET_DEPTH"

const Chart = () => {
    const today = new Date()
    const oneDay = 1000 * 60 * 60 * 24

    const generateDates = (durationInDays) => {
        let result = []
        for (let i = durationInDays - 1; i >= 0; i--) {
            const newDate = new Date(today - (oneDay * i))
            const dateInString = `${newDate.getMonth()} ${newDate.getDate()}`
            result.push(dateInString)
        }
        return result
    }


    const GET_CHART_DATA = gql`
    {
        tradeAggregations(
        last: 168 # 7 days
        resolution: 3600000 # 1 hour
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
    const [showing, setShowing] = useState(CANDLE_STICK)

    const series = {
        type: 'k',
        // dimensions: [null, 'open', 'close', 'lowest', 'highest'],
        // renderItem,
        // encode: {
        //     x: 0,
        //     y: [1, 2, 3, 4],
        //     tooltip: [1, 2, 3, 4]
        // },
        data: [
            [20, 30, 10, 35],
            [40, 35, 30, 55],
            [33, 38, 33, 40],
            [40, 40, 32, 42]
        ],
        itemStyle: {
            color: "rgba(36, 177, 199, 0.7)",
            borderColor: "rgb(36, 177, 199)",
            color0: "rgba(255, 139, 97, 0.7)",
            borderColor0: "rgb(255, 139, 97)"
        }
    }

    const option = {
        xAxis: {
            data: generateDates(7)
        },
        yAxis: {
        },
        series: [{ ...series }],
        // grid: [
        //     {
        //         left: '10%',
        //         right: '8%',
        //         bottom: 150
        //     }
        // ],
        // toolbox: {
        //     feature: {
        //         dataZoom: {
        //             yAxisIndex: false
        //         },
        //         brush: {
        //             type: ['lineX', 'clear']
        //         }
        //     }
        // },
        // xAxis: [
        //     {
        //         type: 'category',
        //         data: generateDates(7),
        //         scale: true,
        //         boundaryGap: false,
        //         axisLine: { onZero: false },
        //         splitLine: { show: false },
        //         splitNumber: 20,
        //         min: 'dataMin',
        //         max: 'dataMax',
        //         axisPointer: {
        //             z: 100
        //         }
        //     }
        // ],
        // yAxis: [
        //     {
        //         scale: true,
        //         splitArea: {
        //             show: true
        //         }
        //     }
        // ],
        // tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //         type: 'cross'
        //     },
        //     backgroundColor: 'rgba(245, 245, 245, 0.8)',
        //     borderWidth: 1,
        //     borderColor: '#ccc',
        //     padding: 10,
        //     textStyle: {
        //         color: '#000'
        //     },
        //     position: function (pos, params, el, elRect, size) {
        //         var obj = {top: 10};
        //         obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
        //         return obj;
        //     },
        //     extraCssText: 'width: 170px'
        // },
        // axisPointer: {
        //     link: {xAxisIndex: 'all'},
        //     label: {
        //         backgroundColor: '#777'
        //     }
        // }
    }

    const dataMockUp = {
        open: 0,
        close: 0,
        high: 0,
        low: 99999999
    }

    // Fetching Data
    const { loading, error, data } = useQuery(GET_CHART_DATA)

    // Chart Option
    const [chartOption, setChartOption] = useState(option)

    // Reduce To 7 Days @ 6 hours interval
    const reduceData = (copyData) => {
        // Get The 6 Oldest Data
        const spliced = copyData.length >= 6 ? copyData.splice(-6, 6) : copyData.splice(0, copyData.length)

        // Prepare Object for new data
        let newData = {
            ...dataMockUp
        }
        // Set Close Price (first array is the newest)
        newData.close = spliced[0].close

        // Set Open Price (last array is the oldest)
        newData.open = spliced[spliced.length - 1].open

        // Set Highest and Lowest Price
        spliced.forEach((dataPerHour, i) => {
            const next = i + 1 === spliced.length ? i : i + 1

            if (dataPerHour.high >= spliced[next].high) {
                if (dataPerHour.high > newData.high) {
                    newData.high = dataPerHour.high
                }
            }

            if (dataPerHour.low <= spliced[next].low) {
                if (dataPerHour.low < newData.low) {
                    newData.low = dataPerHour.low
                }
            }
        })

        // Open, Close, Low, High
        let newChartData = []
        newChartData.push(newData.open)
        newChartData.push(newData.close)
        newChartData.push(newData.low)
        newChartData.push(newData.high)

        return newChartData
    }

    useEffect(() => {
        if (data) {
            const { tradeAggregations } = data
            const copyData = tradeAggregations.slice()

            let newData = []
            while (copyData.length > 0) {
                newData.push(reduceData(copyData))
            }

            let newOption = { ...option }
            newOption.series[0].data = newData
            setChartOption(newOption)
        }

    }, [data])

    useEffect(() => {
        console.log(chartOption)
    }, [chartOption])


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

    const MarketChart = styled.div`
        color: #fff;
        margin-top: 10px;
        height: 500px;
    `

    return (<Container>
        <MarketHeader>
            <nav>
                <button onClick={() => { setShowing(CANDLE_STICK) }}>Candlestick</button>
                <button onClick={() => { setShowing(LINE_CHART) }}>Line Chart</button>
                <button onClick={() => { setShowing(MARKET_DEPTH) }}>Market Depth</button>
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

        <MarketChart>
            {/* {
                showing === CANDLE_STICK && option && <CandleStick />
            }
            {
                showing === LINE_CHART && <LineChart />
            }
            {
                showing === MARKET_DEPTH && <MarketDepth />
            } */}

            {
                showing === CANDLE_STICK && chartOption && (
                    <ReactEcharts
                        option={chartOption}
                    />
                )
            }
        </MarketChart>
    </Container>)
}

export default Chart;