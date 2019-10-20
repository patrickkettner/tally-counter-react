import styled from 'styled-components';

export default styled.button`
    font-size: 1.4rem;
    background: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.primaryColor};
    outline: none;
    overflow: hidden;
    border: none;
    float: ${props => (props.right ? 'right' : 'inherit')};
    &:hover {
        cursor: pointer;
        color: ${props => props.theme.btnBackgroundHover};
    }
`;
