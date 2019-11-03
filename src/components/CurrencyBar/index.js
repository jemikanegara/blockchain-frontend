import React, { useState } from 'react';
import styled from 'styled-components';

const CurrencyBar = () => {
    const isStarredInit = localStorage.getItem("isStarred") || false
    const [isStarred, setIsStarred] = useState(isStarredInit)
    const toggleStar = (value) => {
        localStorage.setItem("isStarred", value)
        setIsStarred(value)
    }

    const Container = styled.div`
        margin-top: 80px;
        background: #181821;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgb(49, 49, 71);
    `

    const Link = styled.a`
        width: 64px;
        height: 56px;
        flex: 0 0 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(255, 255, 255);
        text-decoration: none;
    `

    const LeftLink = styled(Link)`
        box-shadow: rgb(49, 49, 71) -1px 0px 0px inset;

        :hover {
            background: rgb(33, 33, 51);
        }
    `

    const RightStartButton = styled(Link)`
        box-shadow: rgb(49, 49, 71) 1px 0px 0px inset;
        background: rgb(66, 67, 89);
        cursor: pointer;
        
        :hover path {
            fill: rgb(51, 192, 214);
        }
    `

    const Middle = styled.div`
        flex: 1 1 0px;
        display: flex;
        align-items: center;

        :hover .middleLink {
            opacity: 1;
        }
    `

    const MiddleLeft = styled(Middle)`
        justify-content: flex-end;
    `

    const MiddleRight = styled(Middle)`
        justify-content: flex-start;
        background: rgb(66, 67, 89);
    `

    const MiddleMiddleLink = styled.a`
        flex: 0 0 auto;
        width: 24px;
        height: 56px;
        position: relative;
        text-decoration: none;

        ::before {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            width: 0px;
            height: 0px;
            z-index: 1;
            border-style: solid;
            border-width: 0px 0px 56px 24px;
            border-color: transparent transparent rgb(49, 49, 71);
        }

        ::after {
            content: "";
            position: absolute;
            top: 0px;
            left: 1px;
            width: 0px;
            height: 0px;
            z-index: 2;
            border-style: solid;
            border-width: 0px 0px 56px 24px;
            border-color: transparent transparent rgb(66, 67, 89);
        }

        :hover .middleLink {
            transform: scale(1.3, 1.3);
        }
    `

    const MiddleLeftText = styled.div`
        display: flex;
        align-items: center;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.875rem;
        margin: 0px 26px;
    `

    const MiddleLeftTextChildren = styled.div`
        padding: 0px 12px;
        font-weight: 500;
        color: #fff;
        position: relative;

        :not(:last-child){
            border-right: 1px solid rgb(49, 49, 71);
        }

        :hover div {
            opacity: 1;
            transition: opacity 250ms ease 0s;
        }
    `

    const Tooltip = styled.div`
        position: absolute;
        z-index: 13;
        color: rgb(86, 86, 107);
        filter: drop-shadow(rgba(0, 0, 0, 0.2) 0px 1px 3px);
        font-size: 0.75rem;
        line-height: 1rem;
        white-space: nowrap;
        top: -10px;
        left: 50%;
        transform: translate(-50%, -100%);
        background: rgb(255, 255, 255);
        padding: 12px 16px;
        border-radius: 4px;
        opacity: 0;

        ::after {
        content: "";
            position: absolute;
            background: rgb(255, 255, 255);
            width: 9px;
            height: 9px;
            bottom: -4.5px;
            left: 50%;
            transform: translateX(-50%) rotate(45deg);
        }
    `

    const MiddleLink = styled.span`
        opacity: 0;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -10px;
        margin-left: -10px;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(255, 255, 255);
        border-radius: 50%;
        transition: opacity 100ms ease 0s, transform 80ms ease 0s;
    `

    return (
        <Container>
            <LeftLink href="/markets"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="#fff" fillRule="evenodd" d="M10.001 12L20 2h-5.656l-10 10 10 10H20z"></path></svg></LeftLink>

            <Middle>
                <MiddleLeft>
                    <MiddleLeftText>
                        <MiddleLeftTextChildren>XLM</MiddleLeftTextChildren>
                        <MiddleLeftTextChildren>Native <Tooltip>Native Stellar currency</Tooltip> </MiddleLeftTextChildren>
                    </MiddleLeftText>
                    <div>
                        <svg width="32" height="32" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M38.975 10.813l-5.044 2.57L9.576 25.788a14.509 14.509 0 0 1 21.459-14.542l2.887-1.471.43-.22A17.722 17.722 0 0 0 6.274 25.247a3.224 3.224 0 0 1-1.75 3.116L3 29.139v3.62l4.482-2.284 1.451-.74 1.43-.729 25.675-13.082 2.885-1.47 5.964-3.038V7.797l-5.912 3.016zm5.912 4.225L11.822 31.873l-2.885 1.473L3 36.371v3.617l5.896-3.004 5.043-2.57 24.38-12.422a14.509 14.509 0 0 1-21.48 14.553l-.177.094-3.13 1.595a17.722 17.722 0 0 0 28.081-15.696 3.225 3.225 0 0 1 1.75-3.116l1.524-.776v-3.608z" fill="#FFF"></path></svg>
                    </div>
                </MiddleLeft>
                <MiddleMiddleLink href="https://www.stellarx.com/markets/native/ETH:GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5">
                    <MiddleLink className="middleLink">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="#313147" fillRule="evenodd" d="M9.344 22l5-5H0v-4h24l-3.351 3.352L20 17l-5 5H9.344zm5.312-20l-5 5H24v4H0l3.351-3.352L4 7l5-5h5.656z"></path></svg>
                    </MiddleLink>
                </MiddleMiddleLink>
                <MiddleRight></MiddleRight>
            </Middle>

            <RightStartButton onClick={() => {
                isStarred ? toggleStar(false) : toggleStar(true)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    {
                        !isStarred && <path fill="#83848f" d="M12 5.047l-2.376 4.85-5.349.783 3.873 3.803-.91 5.348 4.761-2.523 4.763 2.523-.91-5.348 3.873-3.803-5.35-.783-2.376-4.85zM12 .5l3.707 7.57L24 9.286l-6 5.893 1.415 8.322L12 19.571 4.583 23.5 6 15.178 0 9.285 8.292 8.07 11.999.5z">
                        </path>
                    }

                    {
                        isStarred && <path fill="#fff" d="M12 .5L8.291 8.07 0 9.286l6 5.893L4.585 23.5l7.415-3.929 7.416 3.929L18 15.178 24 9.285 15.707 8.07z"></path>
                    }
                </svg>
            </RightStartButton>
        </Container>
    )
}

export default CurrencyBar