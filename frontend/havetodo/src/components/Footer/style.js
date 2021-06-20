import styled from 'styled-components';

export const Footer = styled.div `
    position: fixed;
    width: 100%;
    height: 5px;
    background: ${props => props.color};
    bottom: 0px;
`;