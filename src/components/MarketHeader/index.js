import React from 'react'
import styled from 'styled-components'

const MarketHeader = (props) => {
    const Container = styled.div`
        background: rgb(49, 49, 71);
        padding: 0px 16px;
        flex-grow: 0;
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
    `
    return (
        <Container>
            {props.children}
        </Container>
    )
}

export default MarketHeader