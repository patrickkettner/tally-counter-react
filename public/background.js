import { getData, storageSync } from './storage.js';
import { increaseCommands, decreaseCommands } from './commands.js';

let items;

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
    // if (details.reason == 'install') {
    //     chrome.tabs.create({ url: chrome.extension.getURL('welcome.html') }, function() {});
    // }
    // if (details.reason == 'update') {
    //     chrome.tabs.create({ url: chrome.extension.getURL('update.html') }, function() {});
    // }
});

// changes numbers in the item array from strings to numbers for people updating from older versions - will remove later
const init = async () => {
    //gets item array from storage and assigns it to items variable
    items = await getData();
    items.forEach(item => {
        if (typeof item.number == 'string') {
            item.number = parseInt(item.number);
        }
    });
    storageSync(items);
};

init();

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

//Tome, je ok, že je tahle funkce takhle dlouhá? Mám nějakou část vyhodit ven a zavolat ji?

chrome.commands.onCommand.addListener(function(command) {
    if (increaseCommands.includes(command) || decreaseCommands.includes(command)) {
        chrome.runtime.sendMessage(command, () => {
            // popup.js doesn't receive message - chrome throws an error - background.js handles the hotkey command
            if (chrome.runtime.lastError) {
                const index = +command.substr(0, 1);

                async function handleCommand() {
                    items = await getData();
                    try {
                        if (increaseCommands.includes(command)) {
                            items[index].number += 1;
                        } else {
                            items[index].number -= 1;
                        }
                        storageSync(items);
                        notification(items[index].itemName, items[index].number, index);
                    } catch (error) {
                        if (error.message == "Cannot read property 'number' of undefined") {
                            errNotification(index);
                        }
                    }
                }
                handleCommand();
            }
        });
    }
});
