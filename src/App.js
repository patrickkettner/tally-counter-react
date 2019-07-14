import React, { Component } from 'react';
import styled from 'styled-components';

import Item from './components/Item';
import Logo from './components/Logo';
import Button from './components/Button';

class App extends Component {
    state = {
        items: [
            {
                itemName: 'whatever',
                number: 2,
            },
            {
                itemName: 'něco',
                number: -1,
            },
        ],
    };

    // componentDidUpdate(prevProps, prevState) {
    //     console.log(prevState.items);
    //     console.log(this.state.items);
    // }

    addItemHandler = () => {
        const updatedArray = [...this.state.items];
        updatedArray.push({ itemName: '', number: 0 })
        this.setState({ items: updatedArray })
    }

    resetAllHandler = () => {
        const updatedArray = this.state.items.map(item => {
            item.number = 0;
            return item;
        });
        this.setState({ items: updatedArray });

    }

    onChangeHandler = (e, index, type) => {
        let updatedArray = [...this.state.items];
        let updatedItem = { ...updatedArray[index] };
        updatedItem[type] = type === 'number' ? +e.target.value : e.target.value;
        updatedArray[index] = updatedItem;
        this.setState({ items: updatedArray })
    }

    deleteHandler = (id) => {
        // what is better?
        // const updatedArray = [...this.state.items];
        // updatedArray.splice(index, 1);
        const updatedArray = this.state.items.filter((item, index) => index !== id)
        this.setState({ items: updatedArray })
    }

    incrementHandler = (index) => {
        const updatedState = {
            ...this.state,
            items: JSON.parse(JSON.stringify(this.state.items))
        }
        updatedState.items[index].number++;
        this.setState(updatedState);
    }

    decrementHandler = (index) => {
        const updatedState = {
            ...this.state,
            items: JSON.parse(JSON.stringify(this.state.items))
        }
        updatedState.items[index].number--;
        this.setState(updatedState);
    }

    resetHandler = (index) => {
        const updatedState = {
            ...this.state,
            items: JSON.parse(JSON.stringify(this.state.items))
        }
        updatedState.items[index].number = 0;
        this.setState(updatedState);
    }

    render() {
        const Header = styled.h1`
            display: inline;
            font-size: 1.3rem;
            font-weight: lighter;
        `;

        return (
            <div className="App">
                <Header>Tally Counter</Header>
                <img
                    src="images/icon48.png"
                    id="icon"
                    alt="logo"
                    style={{
                        width: 18,
                        display: 'inline',
                        marginLeft: '0.3rem',
                    }}
                />
                <Logo />

                settings, export btn
                <br />
                <div>
                    <Button
                        float="left"
                        onClick={this.addItemHandler}>
                        Add item
                    </Button>
                    <Button
                        type="danger"
                        float="right"
                        onClick={this.resetAllHandler}>
                        Reset all
                    </Button>
                </div>

                {
                    this.state.items.map((item, index) => (
                        <Item
                            numberValue={item.number}
                            itemName={item.itemName}
                            key={index}
                            itemNameChange={(e) => this.onChangeHandler(e, index, 'itemName')}
                            numberChange={(e) => this.onChangeHandler(e, index, 'number')}
                            delete={() => this.deleteHandler(index)}
                            increment={() => this.incrementHandler(index)}
                            decrement={() => this.decrementHandler(index)}
                            reset={() => this.resetHandler(index)} />
                    ))
                }

            </div >
        );
    }
}

export default App;
