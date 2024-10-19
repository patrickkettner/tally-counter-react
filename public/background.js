import debounce from './modules/lodash.debounce/index.js';
import { getData, storageSync } from './storage.js';
import { increaseCommands, decreaseCommands } from './commands.js';

chrome.runtime.onInstalled.addListener(async function (details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [new chrome.declarativeContent.PageStateMatcher({})],
                actions: [new chrome.declarativeContent.ShowPageAction()],
            },
        ]);
    });
    if (details.reason == 'install') {
        chrome.tabs.create({ url: chrome.runtime.getURL('welcome.html') }, function () {});
        chrome.storage.local.set({ notifications: true });
    }
    if (details.reason == 'update') {
        chrome.tabs.create({ url: chrome.runtime.getURL('update.html') }, function () {});

        const notificationsRes = await chrome.storage.local.get(['notifications']);
        if (!notificationsRes.notifications) {
            chrome.storage.local.set({ notifications: true });
        }
    }
});

chrome.runtime.onUpdateAvailable.addListener(() => {
    createBadge('↻');
    chrome.action.setTitle({ title: 'Update available, please restart chrome' });
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

const createBadge = (text, index) => {
    const badgeColor = index => {
        switch (index) {
            case 1:
                return '#29a470';

            case 2:
                return '#cc338c';

            case 3:
                return '#de9900';

            case 4:
                return '#000';

            case 'err':
                return '#f00';

            default:
                return '#1f7fe0';
        }
    };
    chrome.action.setBadgeBackgroundColor({ color: badgeColor(index) });
    chrome.action.setBadgeText({ text });
};
const debounceClearBadge = debounce(() => createBadge(''), 700);

async function handleCommand(command, index) {
    const items = await getData();
    try {
        if (increaseCommands.includes(command)) {
            items[index].number += 1;
        } else {
            items[index].number -= 1;
        }
        storageSync(items);

        createBadge(`${items[index].number}`, index);
        debounceClearBadge();
        const notificationSettings = await chrome.storage.local.get('notifications');
        if (notificationSettings.notifications) {
            notification(items[index].itemName, items[index].number, index);
        }
    } catch (error) {
        console.log('error', error);
        createBadge('err', 'err');
        debounceClearBadge();

        if (error.message == "Cannot read property 'number' of undefined") {
            errNotification(index);
        }
    }
}

chrome.commands.onCommand.addListener(function (command) {
    if (increaseCommands.includes(command) || decreaseCommands.includes(command)) {
        chrome.runtime.sendMessage(command, () => {
            if (chrome.runtime.lastError) {
                const index = +command.substr(0, 1);
                handleCommand(command, index);
            }
        });
    }
});
