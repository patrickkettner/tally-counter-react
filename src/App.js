import React, { Component } from 'react';
import styled from 'styled-components';

import Item from './components/Item';
import Logo from './components/Logo';
import Button from './components/Button';
import ImageButton from './components/ImageButton';

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

    getState = () => {
        const updatedState = {
            ...this.state,
            items: JSON.parse(JSON.stringify(this.state.items)),
        };
        return updatedState;
    };

    addItemHandler = () => {
        const updatedState = this.getState();
        updatedState.items.push({ itemName: '', number: 0 });

        this.setState(updatedState);
    };

    resetAllHandler = () => {
        const updatedArray = this.state.items.map(item => {
            item.number = 0;
            return item;
        });
        this.setState({ items: updatedArray });
    };

    onChangeHandler = (e, index, type) => {
        const updatedState = this.getState();
        updatedState.items[index][type] = type === 'number' ? +e.target.value : e.target.value;
        this.setState(updatedState);
    };

    deleteHandler = id => {
        // what is better?
        // const updatedArray = [...this.state.items];
        // updatedArray.splice(index, 1); - filter is better, because splice mutates the orginal array
        const updatedArray = this.state.items.filter((_, index) => index !== id);
        this.setState({ items: updatedArray });
    };

    incrementHandler = index => {
        const updatedState = this.getState();
        updatedState.items[index].number++;
        this.setState(updatedState);
    };

    decrementHandler = index => {
        const updatedState = this.getState();
        updatedState.items[index].number--;
        this.setState(updatedState);
    };

    resetHandler = index => {
        console.log('triggered');
        const updatedState = this.getState();
        updatedState.items[index].number = 0;
        this.setState(updatedState);
    };

    exportHandler = () => {
        let arrOfValues = this.state.items.map(a => a.itemName + ',' + a.number);
        arrOfValues.unshift('Item name,Number');
        let csv = arrOfValues.join('\n');
    
        var data = new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' });
    
        var url = window.URL.createObjectURL(data);
        document.getElementById('export').href = url;
    };


    render() {
        const Header = styled.h1`
            display: inline;
            font-size: 1.3rem;
            font-weight: lighter;
        `;

        return (
            <div className="App">
                <Header>Tally Counter</Header>
                {/* <img
                    src="images/icon48.png"
                    id="icon"
                    alt="logo"
                    style={{
                        width: 18,
                        display: 'inline',
                        marginLeft: '0.3rem',
                    }}
                /> */}
                <Logo />
                <br />
                settings
                <br />
                <div>
                    <Button float="left" onClick={this.addItemHandler}>
                        Add item
                    </Button>
                    
                    <a id="export" download="tally-counter.csv">
                    <ImageButton className="fas fa-file-download" onClick={this.exportHandler} />
                    </a>

                    <Button type="danger" float="right" onClick={this.resetAllHandler}>
                        Reset all
                    </Button>
                </div>
                {this.state.items.map((item, index) => (
                    <Item
                        numberValue={item.number}
                        itemName={item.itemName}
                        key={index} //is this alright? I heard you shouldn't use index as a key
                        itemNameChange={e => this.onChangeHandler(e, index, 'itemName')}
                        numberChange={e => this.onChangeHandler(e, index, 'number')}
                        delete={() => this.deleteHandler(index)}
                        increment={() => this.incrementHandler(index)}
                        decrement={() => this.decrementHandler(index)}
                        reset={() => this.resetHandler(index)}
                    />
                ))}
            </div>
        );
    }
}

export default App;
