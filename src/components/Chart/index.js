import React, { useState, useEffect, useRef } from 'react'

// Styling Import
import { MarketHeader } from '../SharedStyling'
import { Container, MarketChart, RightHead } from './chartStyling'

// Chart Tooling Import
import ReactEcharts from 'echarts-for-react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost"
import { option, dataMockUp, lineChartSeries, candleStickSeries } from './chartDataMockUp'

// What to show
const CANDLE_STICK = "CANDLE_STICK"
const LINE_CHART = "LINE_CHART"
const MARKET_DEPTH = "MARKET_DEPTH"

// Component
const Chart = () => {

    // Set Showing State
    const [showing, setShowing] = useState(CANDLE_STICK)

    // Set GQL Query
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

    // Fetching Data
    const { loading, data } = useQuery(GET_CHART_DATA)

    // Chart Option
    const [chartOption, setChartOption] = useState({ ...option })

    // Chart Ref
    const chartEl = useRef(null)

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

        const volume = spliced.reduce((sum, { counterVolume, baseVolume, price }) =>
            (
                {
                    counterVolume: sum.counterVolume + counterVolume,
                    baseVolume: sum.baseVolume + baseVolume,
                }
            ),
            { counterVolume: 0, baseVolume: 0 }
        )

        // Open, Close, Low, High
        let OHLC = [newData.open, newData.close, newData.low, newData.high]
        return {
            OHLC,
            bar: (volume.baseVolume / 1000)
        }
    }

    const setToCandleStick = () => {
        const { tradeAggregations } = data
        const copyData = tradeAggregations.slice()

        let candleStickData = []

        while (copyData.length > 0) {
            const newData = reduceData(copyData)
            candleStickData.push(newData.OHLC)
        }

        let newOption = { ...option }
        newOption.xAxis.boundaryGap = true
        newOption.series[0] = { ...candleStickSeries }
        newOption.series[0].data = candleStickData

        setChartOption(newOption)
    }

    const setToLineChart = () => {
        const { tradeAggregations } = data
        const copyData = tradeAggregations.slice()

        let lineChartData = []

        while (copyData.length > 0) {
            const newData = reduceData(copyData)
            lineChartData.push(newData.OHLC[1])
        }

        let newOption = { ...option }
        newOption.xAxis.boundaryGap = false
        newOption.series[0] = { ...lineChartSeries }
        newOption.series[0].data = lineChartData

        console.log(newOption)

        setChartOption(newOption)
    }

    const setToMarketDepth = () => {
        return null
    }

    // Set Chart Option 
    useEffect(() => {
        if (data) {
            setToCandleStick(data)
        }
    }, [data])

    // If Showing Changed
    useEffect(() => {
        if (data) {
            switch (showing) {
                case LINE_CHART:
                    setToLineChart(data)
                    break;
                case MARKET_DEPTH:
                    setToMarketDepth(data)
                    break;
                default:
                    setToCandleStick(data)
            }
        }

    }, [showing])

    // If Chart Option Changed
    useEffect(() => {
        if (chartEl.current) {
            const chartInstance = chartEl.current.getEchartsInstance()
            chartInstance.setOption(chartOption)
        }
    }, [chartOption])

    return (<Container>
        <MarketHeader>
            <nav>

                <button
                    className={showing === CANDLE_STICK ? "active" : ""}
                    onClick={() => { setShowing(CANDLE_STICK) }}>
                    Candlestick
                </button>

                <button
                    className={showing === LINE_CHART ? "active" : ""}
                    onClick={() => { setShowing(LINE_CHART) }}>
                    Line Chart
                </button>

                <button className={showing === MARKET_DEPTH ? "active" : ""} onClick={() => { setShowing(MARKET_DEPTH) }}>
                    Market Depth
                </button>

            </nav>
            <RightHead>
                <select>
                    {/* <option value="0">1H @ 1M intervals</option>
                    <option value="1">6H @ 5M intervals</option>
                    <option value="2">1D @ 30M intervals</option>
                    <option value="3">7D @ 3H intervals</option>
                    <option value="4">14D @ 6H intervals</option>
                    <option value="5">30D @ 12H intervals</option>
                    <option value="6">90D @ 1D intervals</option>
                    <option value="7">52W @ 1W intervals</option> */}
                    <option value="8">7D @ 3H intervals</option>
                </select>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24"><path fill="#fff" fillRule="evenodd" d="M12 13.999L2 4v5.656l10 10 10-10V4z"></path></svg></span>
            </RightHead>
        </MarketHeader>

        <MarketChart>
            {loading && <div>Loading ...</div>}
            {
                !loading && chartOption && (
                    <ReactEcharts
                        option={chartOption}
                        notMerge={true}
                        opts={{ renderer: 'svg' }}
                        ref={chartEl}
                    />
                )
            }
        </MarketChart>
    </Container>)
}

export default Chart;