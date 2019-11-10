// DATE
const today = new Date()
const oneDay = 1000 * 60 * 60 * 24
const MonthList = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec"
}

export const generateDates = (durationInDays) => {
    let result = []
    for (let i = durationInDays - 1; i >= 0; i--) {
        const newDate = new Date(today - (oneDay * i))
        const dateInString = `${MonthList[newDate.getMonth()]} ${newDate.getDate()}`

        for (let i = 0; i < 4; i++) {
            if (i === 2) {
                result.push(dateInString)
            } else {
                result.push("")
            }
        }
    }
    return result
}