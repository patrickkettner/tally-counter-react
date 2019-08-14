import React from 'react';
import styled from 'styled-components';
import ActionButton from './ActionButton';
import Input from './Input';

const baseItem = ({ className, ...props }) => {
    return (
        <div className={className}>
            <ActionButton type="delete" onClick={props.delete} />
            <Input itemName
                value={props.itemName}
                onChange={props.itemNameChange} />

            <Input number
                value={props.numberValue}
                onChange={props.numberChange} />
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
`;

export default Item;
