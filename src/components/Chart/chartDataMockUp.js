import { generateDates } from './chartTimeHelper'

const candleStickSeries = {
    type: 'candlestick',
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

const barSeries = {
    type: 'bar',
    data: [
        [20, 30, 10, 35],
        [40, 35, 30, 55],
        [33, 38, 33, 40],
        [40, 40, 32, 42]
    ],
    itemStyle: {
        color: "rgb(86, 86, 107)",
        borderColor: "rgb(86, 86, 107)",
        color0: "rgb(86, 86, 107)",
        borderColor0: "rgb(86, 86, 107)"
    }
}

export const option = {
    xAxis: {
        data: generateDates(7)
    },
    yAxis: {
        min: 0.0003
    },
    series: [{ ...candleStickSeries }],
}

export const dataMockUp = {
    open: 0,
    close: 0,
    high: 0,
    low: 99999999,
    counterVolume: 0,
    baseVolume: 0
}