import styled from 'styled-components';

const Container = styled.div`
    background: ${props => props.theme.backgroundColor};
    margin: 0 auto;
    text-align: center;
    padding: 1rem;
    font-size: 1rem;
    padding-bottom: 0.5rem;
    font-family: Arial, Helvetica, sans-serif;
    min-width: 180px;
    max-width: 500px;
    height: 100vh;
    color: ${props => props.theme.primaryColor};
`;

export default Container;
