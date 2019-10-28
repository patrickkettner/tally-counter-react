import PropTypes from 'prop-types';

import styled from 'styled-components';

const stylesBasedOnInputType = props => {
    let styles = props.itemName
        ? `
    margin: 0 0.5rem;
    width: 120px;
    padding: 0 0 0 0.5rem;
    font-size: 0.75rem;`
        : `
    min-width: 3ch;
    width: ${props.value.toString().length + 1}ch;
    margin-right: 0.4rem;
    text-align: center;
    font-size: 1.1rem;`;

    return styles;
};

const Input = styled.input`
    vertical-align: middle;
    height: 1.4rem;
    font-weight: bold;
    background: ${props => props.theme.inputBackground};
    border: none;
    ${stylesBasedOnInputType};
`;

Input.propTypes = {
    itemName: PropTypes.bool,
    number: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Input;
