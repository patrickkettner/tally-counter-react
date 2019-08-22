import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';


const changeButtonBackground = props => {
    switch (props.type) {
        case 'delete':
            return '#ff5d5d';

        case 'plus':
            return '#64ff50';

        case 'minus':
            return '#ff5d5d';

        case 'undo':
            return '#ffee00';

        default:
            return '#333';
    }
};

const Button = ({className, ...props}) => {
    return (
        <button className={className}>
            <i className={props.type === 'delete' ? 'fas fa-times' : `fas fa-${props.type}`} />
        </button>
    );
};

const ActionButton = styled(Button)`
    width: 1.5rem;
    height: 1.5rem;
    padding: 0 0.5rem;
    margin: 0.2rem;
    color: #fff;
    border-radius: 50%;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    cursor: pointer;
    background: ${changeButtonBackground};
    transition: transform 0.3s;
    &:hover {
        ${props => (props.type === 'undo' ? 'transform: rotate(-180deg) scale(1.2)' : 'transform: scale(1.2)')};
    }
`;


ActionButton.propTypes = {
    type: PropTypes.string.isRequired
}

export default ActionButton;
