import styled from 'styled-components';

export const Container = styled.div `
    background: var(--branco);
    border: 1px solid #DBE2E9;
    border-radius: 5px;
    width: 232px;
    height: 66px;
    align-items: center;
    display: flex;
    flex-direction: line;
    justify-content: space-between;
    transition: 0.3s;
    box-shadow: ${props => props.actived ? '0px 6px 6px rgba(70, 80, 98, 0.08)' : '0'};
    transform: ${props => props.actived ? 'translateY(-3px)' : '0'};

    h3 {
        font-size: 1.6rem;
        color: var(--azul);
        font-weight: bold;
        text-align: right;
        align-self: right;
        margin-right: 20px; 
    }

    img {
        width: 20px;
        margin-left: 20px;
    }
    
`;