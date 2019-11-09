import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

export const types = { DELETE: 'delete', PLUS: 'plus', MINUS: 'minus', UNDO: 'undo' };

const changeButtonBackground = props => {
    switch (props.type) {
        case types.DELETE:
            return '#ff5d5d';

        case types.PLUS:
            return props.theme.plusButton;

        case types.MINUS:
            return '#ff5d5d';

        case types.UNDO:
            return props.theme.undoButton;

        default:
            return '#333';
    }
};

const Button = ({ className, ...props }) => {
    return (
        <button className={className} onClick={props.onClick}>
            <i className={props.type === 'delete' ? 'fas fa-times' : `fas fa-${props.type}`} />
        </button>
    );
};

const ActionButton = styled(Button)`
    min-width: 1.5rem;
    height: 1.5rem;
    margin: 0.2rem;
    font-size: 1rem;
    color: #fff;
    border-radius: 50%;
    outline: none;
    border: none;
    transition: transform 0.2s;
    cursor: pointer;
    background: ${changeButtonBackground};
    &:hover {
        ${props => (props.type === 'undo' ? 'transform: rotate(-180deg) scale(1.2)' : 'transform: scale(1.2)')};
    }
`;

ActionButton.propTypes = {
    type: PropTypes.oneOf([types.DELETE, types.PLUS, types.MINUS, types.UNDO]).isRequired,
};

export default ActionButton;
