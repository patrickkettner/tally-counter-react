import { getData, storageSync } from './storage.js';
import { increaseCommands, decreaseCommands } from './commands.js';

// onInstalled
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [new chrome.declarativeContent.PageStateMatcher({})],
                actions: [new chrome.declarativeContent.ShowPageAction()],
            },
        ]);
    });
    if (details.reason == 'install') {
        chrome.tabs.create({ url: chrome.extension.getURL('welcome.html') }, function() {});
        localStorage.setItem('notifications', true);
        console.log('INSTALL notifications are set to true');
    }
    if (details.reason == 'update') {
        chrome.tabs.create({ url: chrome.extension.getURL('update.html') }, function() {});
        if (!localStorage.getItem('notifications')) {
            localStorage.setItem('notifications', true);
            console.log('UPDATE notifications are set to true');
        }
    }
});

//onUpdateAvailable notification
chrome.runtime.onUpdateAvailable.addListener(() => {
    const options = {
        type: 'basic',
        title: 'Tally counter',
        message: 'Tally counter update available, restart chrome!',
        iconUrl: 'images/icon128.png',
    };
    chrome.notifications.create(options);
});

const notification = (itemName, number, index) => {
    const name = !itemName ? `(item #${index + 1})` : itemName;
    const options = {
        type: 'basic',
        title: `${name}: ${number}`,
        message: '',
        iconUrl: 'images/icon128.png',
    };
    chrome.notifications.create(options);
};

const errNotification = index => {
    const options = {
        type: 'basic',
        title: `item #${index + 1} doesn't exist`,
        message: 'Open the extension and create a new item',
        iconUrl: 'images/icon128.png',
    };
    chrome.notifications.create(options);
};

async function handleCommand(command, index) {
    const items = await getData();
    try {
        if (increaseCommands.includes(command)) {
            items[index].number += 1;
        } else {
            items[index].number -= 1;
        }
        storageSync(items);
        const notificationSettings = JSON.parse(localStorage.getItem('notifications'));
        if (notificationSettings) {
            notification(items[index].itemName, items[index].number, index);
        }
    } catch (error) {
        if (error.message == "Cannot read property 'number' of undefined") {
            errNotification(index);
        }
    }
}

chrome.commands.onCommand.addListener(function(command) {
    if (increaseCommands.includes(command) || decreaseCommands.includes(command)) {
        chrome.runtime.sendMessage(command, () => {
            // App.js doesn't receive message - chrome throws an error - background.js handles the hotkey command
            if (chrome.runtime.lastError) {
                const index = +command.substr(0, 1);
                handleCommand(command, index);
            }
        });
    }
});
