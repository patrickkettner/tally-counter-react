import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import ActionButton from './ActionButton';
import Input from './Input';

const baseItem = ({ className, ...props }) => {
    return (
        <div className={className}>
            <ActionButton type="delete" onClick={props.delete} />
            <Input itemName value={props.itemName} onChange={props.itemNameChange} />

            <Input number value={props.numberValue} onChange={props.numberChange} />
            <ActionButton type="plus" onClick={props.increment} />
            <ActionButton type="minus" onClick={props.decrement} />
            <ActionButton type="undo" onClick={props.reset} />
        </div>
    );
};

const Item = styled(baseItem)`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5rem 0;
    background: ${props => props.theme.backgroundColor};
    &:last-of-type {
        margin-bottom: 1rem;
    }
`;

Item.propTypes = {
    numberValue: PropTypes.number.isRequired,
    itemName: PropTypes.string.isRequired,
    itemNameChange: PropTypes.func.isRequired,
    numberChange: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
};

export default Item;
