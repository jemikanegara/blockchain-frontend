import React from "react"
import styled from 'styled-components'

const TryStellar = () => {
    const Container = styled.div`
        background-color: rgb(255, 224, 138);
        background-image: url(data:image/svg+xml,%20%3Csvg%20width%3D%22849%22%20height%3D%22800%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%20%3Cpath%20d%3D%22M278.97%20402.646L0%200h287.502l137.085%20195.25%2056.828-80.969L561.656%200h287.487l-79.185%20114.281-56.085%2080.97H424.587l23.382%2033.312%2080.24%20114.296L849.144%20800h-294.89L424.587%20612.836l-50.511%2072.883L294.89%20800H0l80.256-114.281z%22%20fill%3D%22%23ffd970%22%20fill-rule%3D%22evenodd%22%20/%3E%20%3C/svg%3E%20);
        background-size: 314px;
        color: rgb(49, 49, 71);
        position: relative;
        background-repeat: no-repeat;
        background-position: right -75px top 0px;
        padding: 48px 32px 26px;

        h2 {
            font-size: 1.5rem;
            line-height: 2rem;
            font-weight: 600;
            margin: 0px 0px 12px;
        }

        p:not(:last-child) {
            font-size: 1.25rem;
            line-height: 1.5rem;
            max-width: 225px;
            margin: 0px 0px 40px;
        }

        a {
            display: inline-block;
            cursor: pointer;
            text-align: center;
            width: 100%;
            font-size: 0.75rem;
            letter-spacing: 2.5px;
            font-weight: 600;
            text-transform: uppercase;
            height: 56px;
            line-height: 2rem;
            min-width: 56px;
            color: rgb(255, 255, 255);
            border: none;
            outline: none;
            margin: 0px;
            text-decoration: none;
            border-radius: 2px;
            padding: 12px 24px;
            background: rgb(49, 49, 71);
        }

        a:hover {
            color: rgb(255, 255, 255);
            background: rgb(66, 67, 89);
        }
    `

    const Foot = styled.p`
        font-size: 0.75rem;
        line-height: 0.75rem;
        margin: 22px 0px 0px;
    `

    return (
        <Container>
            <h2>Try StellarX</h2>
            <p>Join now for <em>totally</em> free peer-to-peer trading.</p>
            <a href="/signup">Signup</a>
            <Foot>
                * Yep, we even refund your network costs.
            </Foot>
        </Container>
    )
}

export default TryStellar