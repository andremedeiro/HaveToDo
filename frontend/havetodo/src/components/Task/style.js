import styled from 'styled-components';

export const Container = styled.div `

    width: 232px;
    height: 96px;
    margin: 10px;
    background: #F5F5F1;
    border-radius: 5px;
    transition: 0.3s;
    border: 3px solid ${props => props.state || 'var(--azul)'};
    overflow: hidden;

    h3 {
        margin:0;
        padding: 0;
        font-size: 1.6rem;
        color: ${props => props.state || 'var(--azul)'};;
        font-weight: bold;
        text-align: left;
        align-self: left;
        margin: 10px 0 0 12px;
    }

    h4 {
        margin:0;
        padding: 0;
        font-size: 1.2rem;
        color: ${props => props.state || 'var(--azul)'};;
        font-weight: 600;
        text-align: left;
        align-self: left; 
        margin-left: 12px;
    }

    h5 {
        margin:0;
        padding: 0;
        font-size: 1.2rem;
        color: var(--cinza);
        font-weight: 600;
        text-align: right;
        align-self: right; 
        margin: 0 12px 12px 0;
    }
    
    &:hover {
        box-shadow: 0px 6px 6px rgba(70, 80, 98, 0.08);
        transform: translateY(-3px);
    }
`;