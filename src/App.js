import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Container from './components/Container';
import Item from './components/Item';
import Logo from './components/Logo';
import TextButton from './components/TextButton';
import ImageButton from './components/ImageButton';
import { light, dark } from './theme';

class App extends Component {
    state = {
        dark: false,
        items: [
            {
                itemName: 'whatever',
                number: 2,
                id: 1,
            },
            {
                itemName: 'něco',
                number: -1,
                id: 2,
            },
        ],
    };

    getState = () => {
        const updatedState = {
            ...this.state,
            ...this.state.items,
            // items: JSON.parse(JSON.stringify(this.state.items)),
        };
        return updatedState;
    };

    toggleThemeHandler = () => {
        this.setState(prevState => ({
            dark: !prevState.dark,
        }));
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
            <ThemeProvider theme={this.state.dark ? dark : light}>
                <Container>
                    <Header style={{ marginLeft: '1.4rem' }}>Tally Counter </Header>
                    <Logo />
                    <ImageButton right className="fas fa-cog" onClick={this.toggleThemeHandler} />
                    <br />
                    <br />
                    <div>
                        <TextButton float="left" onClick={this.addItemHandler}>
                            Add item
                        </TextButton>

                        <a id="export" href="index.html" download="tally-counter.csv">
                            <ImageButton className="fas fa-file-download" onClick={this.exportHandler} />
                        </a>

                        <TextButton type="danger" float="right" onClick={this.resetAllHandler}>
                            Reset all
                        </TextButton>
                    </div>
                    {this.state.items.map((item, index) => (
                        <Item
                            numberValue={item.number}
                            itemName={item.itemName}
                            key={index} //is this alright? I heard you shouldn't use index as a key - yeah it's wrong David!!
                            itemNameChange={e => this.onChangeHandler(e, index, 'itemName')}
                            numberChange={e => this.onChangeHandler(e, index, 'number')}
                            delete={() => this.deleteHandler(index)}
                            increment={() => this.incrementHandler(index)}
                            decrement={() => this.decrementHandler(index)}
                            reset={() => this.resetHandler(index)}
                        />
                    ))}
                </Container>
            </ThemeProvider>
        );
    }
}

export default App;
