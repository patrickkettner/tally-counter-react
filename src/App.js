import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import uuid from 'uuid/v4';
import { getData, storageSync } from './storage';
import { increaseCommands, decreaseCommands } from './commands.js';

import Container from './components/Container';
import Item from './components/Item';
import Logo from './components/Logo';
import TextButton from './components/TextButton';
import ImageButton from './components/ImageButton';
import { light, dark } from './theme';
/* global chrome */

class App extends Component {
    state = {
        notifications: true,
        dark: true,
        items: [
            {
                itemName: '',
                number: 0,
                id: '0a73d808-3452-414b-ae45-a040a9be244c',
            },
            {
                itemName: 'error',
                number: 999,
                id: '2060229c-dd26-4f6b-a253-f8e2e9f029f0',
            },
        ],
    };

    // data = async () => {
    //     const items = await getData;
    //     await this.setState({ ...this.state, items: items });
    // };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.items !== this.state.items) {
            storageSync(this.state.items);
        }
        console.log(this.state.items);
    }

    getState = () => {
        const updatedState = {
            ...this.state,
            items: [...this.state.items],
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
        updatedState.items.push({ itemName: '', number: 0, id: uuid() });

        this.setState(updatedState);
    };

    resetAllHandler = () => {
        const conf = window.confirm('Are you sure? All values will be reset to 0.');
        if (!conf) {
            return;
        } else {
            const updatedArray = this.state.items.map(item => {
                item.number = 0;
                return item;
            });
            this.setState({ items: updatedArray });
        }
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
        console.log(updatedState);
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

    componentDidMount() {
        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
            if (increaseCommands.includes(message)) {
                const index = message.substr(0, 1);
                // form.children[index].children[3].click();
                sendResponse('increased');
                console.log(' INC message, index:', index);
                const updatedState = {
                    ...this.state,
                    items: [...this.state.items],
                };
                console.log(updatedState);
                updatedState.items[index].number++;
                this.setState(updatedState);
                // this.incrementHandler(index);
            }

            if (decreaseCommands.includes(message)) {
                const index = message.substr(0, 1);
                // form.children[index].children[4].click();
                sendResponse('decreased');
                console.log(' DEC message, index:', index);
                this.decrementHandler(index);
            }
        });

        if (localStorage.getItem('notifications')) {
            const notifications = localStorage.getItem('notifications') === 'true' ? true : false;
            this.setState({
                ...this.state,
                notifications,
            });
        }

        if (localStorage.getItem('theme')) {
            const theme = localStorage.getItem('theme') === 'true' ? true : false;
            this.setState(prevState => ({
                ...prevState.state,
                dark: theme,
            }));
        }

        getData().then(items => {
            this.setState({ ...this.state, items: items });
        });
    }

    render() {
        const Header = styled.h1`
            display: inline;
            font-size: 1.3rem;
            font-weight: lighter;
        `;
        return (
            <ThemeProvider theme={this.state.dark ? dark : light}>
                <Container>
                    <ImageButton
                        left
                        small
                        className={this.state.notifications ? 'fas fa-bell-slash' : 'fas fa-bell'}
                        style={{ width: '20px' }}
                        onClick={this.toggleNotificationsHandler}
                    />
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
                            key={item.id}
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
