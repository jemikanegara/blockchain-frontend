import React, { useState, useRef, useEffect } from 'react'
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

const CandleStick = () => {
    const series = {
        type: 'candlestick',
        data: [
            [20, 30, 10, 35],
            [40, 35, 30, 55],
            [33, 38, 33, 40],
            [40, 40, 32, 42]
        ],
        itemStyle: {
            color: "green",
            borderColor: "green",
            color0: "red",
            borderColor0: "red"
        }
    }

    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
            min: 10,
            max: 100
        },
        series: [{ ...series, type: 'line' }]
    }

    const chartEl = useRef(null)
    const [echartsInstance, setEchartsInstance] = useState(null)
    const [chartOption, setChartOption] = useState(option)

    // Create Instance Only Once
    useEffect(() => {
        const setInit = () => {
            if (chartEl) {
                const newInstance = echarts.init(chartEl.current)
                // newInstance.setOption(chartOption)
                setEchartsInstance(newInstance)
                setChartOption(option, false, true)
            }
        }
        setTimeout(
            setInit, 1000
        )
    }, [])

    useEffect(() => {
        if (echartsInstance) {
            echartsInstance.setOption(chartOption)
        }
    }, [chartOption, echartsInstance])

    return (
        <React.Fragment>
            <div ref={chartEl}></div>
            {/* {
                echartsInstance && (<div id="candlestick" ref={chartEl}></div>)
            }
            {
                !echartsInstance && (<div id="candlestick" ref={chartEl}></div>)
            } */}
        </React.Fragment>
    )
}

export default CandleStick