import React from 'react';
import styled from 'styled-components'

const Header = () => {

    const Container = styled.header`
        display: flex;
        justify-content: space-between;
        position: fixed;
        top: 0;
        height: 80px;
        width: 100%;
        background: #181821;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
    `

    const Left = styled.div`
        display: flex;
    `

    const Logo = styled.a`
        flex-shrink: 0;
        text-align: center;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        padding: 0px 32px;
        border-radius: 2px;
        text-decoration: none;

        path {
            fill: #fff;
        }

        :hover path {
            fill: rgb(63, 203, 224);
        }
    `

    const NavList = styled.ul`
        display: flex;
        -webkit-box-align: stretch;
        align-items: stretch;
        list-style: none;
        padding: 0px;
        margin: 0px 12px;

        a {
            color: rgb(255, 255, 255);
            display: block;
            font-size: 0.9375rem;
            line-height: 5rem;
            padding-left: 7px;
            padding-right: 7px;
            white-space: nowrap;
            margin: 0px 9px;
            text-decoration: none;
            position: relative;
        }

        a:hover {
            color: rgb(63, 203, 224);
        }

        a.active::before {
            content: "";
            width: 100%;
            top: 0;
            left: 0;
            position: absolute;
            height: 8px;
            background: #fff;
        }

        a:hover::before {
            background: rgb(63, 203, 224);
        }
    `

    const Right = styled.div`
        text-align: right;
        display: flex;
    `

    const SupportLink = styled.a`
        color: rgb(255, 255, 255);
        display: block;
        font-size: 0.9375rem;
        line-height: 5rem;
        padding-left: 7px;
        padding-right: 7px;
        white-space: nowrap;
        margin: 0px 9px;
        text-decoration: none;

        :hover {
            color: rgb(63, 203, 224);
            text-decoration: underline;
        }
    `

    const NavDropdown = styled.button`
        cursor: pointer;
        font-size: inherit;
        font-weight: inherit;
        text-align: inherit;
        height: 80px;
        color: rgb(255, 255, 255);
        background: none;
        border-width: initial;
        border-style: none;
        border-color: initial;
        border-image: initial;
        outline: none;
        margin: 0px 0px 0px -24px;
        padding: 29px 32px;
        color: #fff;

        :hover {
            color: rgb(63, 203, 224);
        }

        path {
            fill: #fff;
        }

        :hover path {
            fill: rgb(63, 203, 224);
        }
    `

    const DropDownIcon = styled.span`
        margin-left: 6px;
    `

    const HeaderRightButton = styled.a`
        display: inline-block;
        font-size: 0.75rem;
        line-height: 2rem;
        font-weight: 600;
        letter-spacing: 0.1563rem;
        text-align: center;
        vertical-align: middle;
        text-transform: uppercase;
        width: 100%;
        -webkit-font-smoothing: antialiased;
        background-position: left bottom;
        padding: 24px 0px;
        text-decoration: none;
        transition: all 0.15s ease 0s;
        width: 180px;
        color: #313147;

        :hover {
            background-size: 300% 100%;
            background-position: left bottom;
        }
    `

    const LoginButton = styled(HeaderRightButton)`
        background: linear-gradient(115deg, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 50%) left bottom / 100% 100%;
    `

    const SignupButton = styled(HeaderRightButton)`
        background: linear-gradient(115deg, rgb(255, 224, 138) 50%, rgb(255, 217, 112) 50%) left bottom / 100% 100%;
    `

    return (
        <Container>
            <Left>
                <Logo href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="123" height="24" viewBox="0 0 123 24"><path fill="#313147" d="M22.071 0v5.733h2.34v3.889h-2.34v13.805H16.8V9.622h-2.24V5.733h2.24V0h5.272zm11.786 5.206c5.634 0 9.489 4.053 9.489 10.643v.56H30.001c.462 1.878 1.812 2.866 4.086 2.866 1.054 0 1.911-.296 2.702-.988h5.733c-1.714 3.69-4.646 5.568-8.6 5.568-2.702 0-4.876-.922-6.689-2.833-1.713-1.813-2.602-4.053-2.602-6.557 0-2.471.955-4.745 2.701-6.491 1.78-1.78 4.119-2.768 6.525-2.768zm-4.02 7.513h8.27c-.627-1.813-2.109-2.801-4.185-2.801-2.175 0-3.723 1.12-4.086 2.8zm15.685 10.708V0h5.173v23.427h-5.173zm8.507 0V0H59.2v23.427h-5.17zM75.125 7.71V5.734h5.206v17.693h-5.04v-1.976c-1.55 1.515-3.13 2.075-5.24 2.075-2.141 0-3.986-.692-5.536-2.075-2.042-1.813-3.097-4.186-3.097-6.953 0-2.538.989-4.811 2.834-6.59C65.9 6.293 67.91 5.47 70.15 5.47c2.142 0 3.79.724 4.975 2.24zm-3.92 11.104c2.24 0 4.118-1.845 4.118-4.283 0-2.537-1.878-4.449-4.316-4.449-2.471 0-4.383 2.01-4.383 4.383 0 2.47 1.912 4.35 4.58 4.35zm12.274 4.613V5.734h5.272v17.693h-5.272zM93.914 5.47a3.503 3.503 0 1 1 0 7.006 3.503 3.503 0 0 1 0-7.006zm15.855 9.169l-6.17-8.906h6.36l3.031 4.319 1.257-1.791 1.775-2.528h6.358l-1.751 2.528-1.24 1.79h-6.399l.517.738 1.775 2.527 7.098 10.111h-6.522l-2.868-4.14-1.117 1.612-1.751 2.528h-6.523l1.775-2.528 4.395-6.26zM8.402 12.455c3.624.989 5.436 2.372 5.436 5.305 0 3.558-2.8 6.128-7.084 6.128C2.8 23.888.362 21.747 0 18.155h4.91v.165c0 .988.79 1.68 1.91 1.68 1.121 0 1.78-.56 1.78-1.548 0-1.45-1.417-1.384-3.625-2.076C1.911 15.42.428 13.773.428 11.104c0-3.46 2.537-5.898 6.755-5.898 3.657 0 5.996 2.076 6.195 5.437H8.666c-.198-1.154-.627-1.648-1.549-1.648-1.022 0-1.614.593-1.614 1.45 0 1.22 1.087 1.515 2.899 2.01z"></path></svg>
                </Logo>
                <NavList>
                    <li><a href="/markets" className="active">Markets</a></li>
                </NavList>
            </Left>
            <Right>
                <SupportLink href="https://stellarxsupport.zendesk.com/" target="_blank" rel="noopener noreferrer">Support</SupportLink>
                <NavDropdown>
                    USD
                    <DropDownIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24"><path fill="#313147" fillRule="evenodd" d="M12 13.999L2 4v5.656l10 10 10-10V4z"></path></svg>
                    </DropDownIcon>
                </NavDropdown>
                <LoginButton href="/login">
                    Login
                </LoginButton>
                <SignupButton href="/">
                    Sign Up
                </SignupButton>
            </Right>

        </Container>
    )
}

export default Header