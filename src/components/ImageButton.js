import styled from 'styled-components';

const changeFloat = props => {
    if (props.right) {
        return 'right';
    } else if (props.left) {
        return 'left';
    } else {
        return 'inherit';
    }
};

export default styled.button`
    font-size: ${props => (props.small ? '1rem' : '1.4rem')};
    background: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.primaryColor};
    outline: none;
    overflow: hidden;
    border: none;
    float: ${changeFloat};
    &:hover {
        cursor: pointer;
        color: ${props => props.theme.btnBackgroundHover};
    }
`;
