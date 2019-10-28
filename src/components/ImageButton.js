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
    font-size: ${props => (props.small ? '0.9rem' : '1.4rem')};
    height: ${props => (props.small ? '23px' : 'initial')};
    background: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.primaryColor};
    /* margin-left: ${props => (props.left ? '1rem' : 'inherit')};
    margin-right: ${props => (props.right ? '1rem' : 'inherit')}; */
    outline: none;
    overflow: hidden;
    border: none;
    float: ${changeFloat};
    &:hover {
        cursor: pointer;
        color: ${props => props.theme.btnBackgroundHover};
    }
`;
