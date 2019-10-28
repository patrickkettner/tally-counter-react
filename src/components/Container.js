import styled from 'styled-components';

const Container = styled.div`
    background: ${props => props.theme.backgroundColor};
    margin: 0 auto;
    text-align: center;
    padding: 1rem 1rem 0.5rem 1rem;
    font-size: 1rem;
    font-family: Arial, Helvetica, sans-serif;
    min-width: 250px;
    color: ${props => props.theme.primaryColor};
`;

export default Container;
