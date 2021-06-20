import styled from 'styled-components';

export const Container = styled.div `

    h1 {
        padding: 5px 0 20px 0;
        text-align: center;
    }

`;

export const FilterArea = styled.div `
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, 232px);
    grid-column-gap: 35px;
    grid-row-gap: 15px;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
`;

export const TaskArea = styled.div `
    width: 100%;
    height: 100px;
    display: grid;
    grid-template-columns: repeat(auto-fit, 232px);
    grid-column-gap: 35px;
    grid-row-gap: 15px;
    padding-left: 20px;
`;

export const FormTask = styled.div `
    background: rgba(70, 80, 98, 0.8);
    width: 100vw;
    height: 100vh;
    display: flex;
    overflow: hidden;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 4;
    align-items: center;
    flex-direction: column;

    .area {
        width: 50vw;
        height: 90vh;
        margin: auto;
        overflow: hidden;
    }
    
    .title {
        background: var(--azul);
        width: 50%;
        height: 7vh;
        border-radius: 10px 10px 0 0;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title h1 {
        color: var(--branco);
        padding: 0;
        margin: 0;
    }

    .form {
        background: var(--branco);
        width: 100%;
        height: 83vh;
        border-radius: 10px;
        display: block;
    }

    .inputs {
        display: flex;
        flex-direction: column;
        padding: 50px 50px 0 50px;
    }

    label {
        color: var(--azul);
        font-weight: 700;
        font-size: 1.5rem; 
        padding: 0;
        margin: 0;
    }

    input, textarea {
        background: none;
        border: none;
        border-bottom: 1px solid var(--cinza);
        margin-bottom: 10px;
        height: 20px;
        font-family: poppins;
        font-weight: 500;
        padding: 5px;
        color: var(--azul);
    }

    #conclude-task {
        background-color: var(--branco);
    }

    textarea {
        border: 1px solid var(--cinza);
        height: 70px;
        border-radius: 5px;
    }

    *:focus {
        outline: none !important;
    }

    button, a {
        border: none;
        font-family: poppins;
        font-weight: 700;
        font-size: 1.2rem;
        padding: 7px 14px;
        border-radius: 3px;
        background: ${props => props.background};
        color: ${props => props.color};
        cursor: pointer;
    }

    .action {
        display: flex;
        flex-direction: column;
    }

    .action a {
        width: 130px;
        margin-top: 10px;
        text-align: center;
    }

    .close {
        float: right;
        margin-top: 5em;
    }

    .close button {
        width: 100px;
        margin-top: 5px;
        text-align: center;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        padding: 0 50px 50px 50px;
    }
`;


