export const renderItem = (params, api) => {
    var xValue = api.value(0);
    var openPoint = api.coord([xValue, api.value(1)]);
    var closePoint = api.coord([xValue, api.value(2)]);
    var lowPoint = api.coord([xValue, api.value(3)]);
    var highPoint = api.coord([xValue, api.value(4)]);
    var halfWidth = api.size([1, 0])[0] * 0.35;
    var style = api.style({
        stroke: api.visual('color')
    });

    return {
        type: 'group',
        children: [{
            type: 'line',
            shape: {
                x1: lowPoint[0], y1: lowPoint[1],
                x2: highPoint[0], y2: highPoint[1]
            },
            style: style
        }, {
            type: 'line',
            shape: {
                x1: openPoint[0], y1: openPoint[1],
                x2: openPoint[0] - halfWidth, y2: openPoint[1]
            },
            style: style
        }, {
            type: 'line',
            shape: {
                x1: closePoint[0], y1: closePoint[1],
                x2: closePoint[0] + halfWidth, y2: closePoint[1]
            },
            style: style
        }]
    };
}