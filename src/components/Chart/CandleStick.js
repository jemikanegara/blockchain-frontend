import React, {useState, useRef} from 'react'

const CandleStick = () => {
    const chartEl = useRef(null)

    return (
        <div id="candlestick" ref={chartEl}></div>
    )
}

export default CandleStick