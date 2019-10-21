import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { getData, storageSync } from './storage';

import Container from './components/Container';
import Item from './components/Item';
import Logo from './components/Logo';
import TextButton from './components/TextButton';
import ImageButton from './components/ImageButton';
import { light, dark } from './theme';

class App extends Component {
    state = {
        notifications: true,
        dark: false,
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

    // data = async () => {
    //     const items = await getData;
    //     await this.setState({ ...this.state, items: items });
    // };

    componentDidMount() {
        getData().then(items => {
            this.setState({ ...this.state, items: items });
        });
        if (localStorage.getItem('theme')) {
            const theme = localStorage.getItem('theme') === 'true' ? true : false;
            this.setState(prevState => ({
                dark: theme,
            }));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.items != this.state.items) {
            console.log(prevState.items);
            console.log(this.state.items);
            storageSync(this.state.items);
        }
    }

    getState = () => {
        const updatedState = {
            ...this.state,
            items: JSON.parse(JSON.stringify(this.state.items)),
        };
        return updatedState;
    };

    toggleNotificationsHandler = () => {
        const notifications = !this.state.notifications;
        localStorage.setItem('notifications', notifications);
        this.setState(prevState => ({
            notifications: !prevState.notifications,
        }));
    };

    toggleThemeHandler = () => {
        const theme = !this.state.dark;
        localStorage.setItem('theme', theme);
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
                    <ImageButton left small className="fas fa-bell" onClick={this.toggleNotificationsHandler} />
                    <Header>Tally Counter</Header>
                    <Logo />
                    <ImageButton
                        small
                        right
                        className={this.state.dark ? 'fa fa-lightbulb' : 'fas fa-moon'}
                        style={{ width: '22.4px' }}
                        onClick={this.toggleThemeHandler}
                    />
                    <div style={{ margin: '1rem 0' }}>
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
