import styled from 'styled-components';

export const Container = styled.div `

    h1 {
        color: var(--azul);
        padding: 5px 0 20px 0;
        text-align: center;
    }

`;

export const FilterArea = styled.div `
    width: 100%;
    height: 100px;
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
