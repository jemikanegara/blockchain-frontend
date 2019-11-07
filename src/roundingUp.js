const roundingUp = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

export default roundingUp