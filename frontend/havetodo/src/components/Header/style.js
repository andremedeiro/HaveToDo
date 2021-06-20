import styled from 'styled-components';

export const Navbar = styled.div `
    width: 100%;
    height: 95px;
    background: #F5F5F1;
    border-bottom: 5px solid var(--situation-color);
    align-items: center;
    justify-content: center;
    display: flex;

    h1 {
        padding: 0px !important;
        margin: auto;
        font-weight: 700;
        color: var(--azul);
        font-size: 2.5rem;
    }

    h1 span {
        color: var(--situation-color);
    }

    #logo {
        overflow: hidden;
        margin: auto;
        transform: translateX(50%);
    }

    a {
        float: right;
        margin: 30px;
    }

    a span {
        background: var(--vermelho);
        border-radius: 100%;
        height: 13px;
        width: 13px;
        display: block;
        position: absolute;
        top: 32px;
        right: 83px;
        z-index: 2;
    }

    .sino {
        margin-top: 5px;
        height: 30px;
        transition: 0.3s;
    }

    .sino:hover {
        opacity: 0.95;
    }

    .menu {
        width: 25px;
        height: 21px;
        margin-right: 30px;
        cursor: pointer;
        transition: 0.3s;
        z-index: 10;
    }

    .menu:hover {
        opacity: 0.8;
    }

    .one, .two, .three {
        background: var(--azul);
        width: 100%;
        height: 3px;
        transition: 0.3s ease-in-out;
    }

    .one, .two{
        margin-bottom: 6px
    }

    .menu.close .one {
        transform: rotate(45deg) translate(7px, 7px);
    }
    
    .menu.close .two {
        display: none;
    }

    .menu.close .three {
        transform: rotate(-45deg) translate(0px, 0px);
    }
`;

export const Menu = styled.div `
    .menu-toggle{
        position: absolute;
        top: 0;
        right: -25vw;
        background: var(--branco);
        height: 100vh;
        width: 25vw;
        box-shadow: 0px 0px 30px rgba(70, 80, 98, 0.15);
        z-index: 3;
        transition: 0.3s ease-in-out;
        display: flex;
        justify-content: center;
    }

    .menu-toggle.on{
        right: 0;
    }

    .menu-toggle h1 {
        bottom: 20px;
        position: absolute;
        font-size: 2.3rem;
    }

    ul {
        list-style-type: none;
        position: absolute;
        top: 20vh;
        right: 40px;
    }

    a {
        font-size: 2rem;
        font-weight: 400;
        margin: 15px 0;
        color: var(--azul);
        transition: 0.3s;
        cursor: pointer;
        text-decoration: none;
    }

    a:hover {
        opacity: 0.9;
    }

    a.active {
        font-weight: 700;
    }
`;