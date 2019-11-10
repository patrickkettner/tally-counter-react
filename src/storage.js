import uuid from 'uuid/v4';

/* global chrome */
export const getData = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['items'], function(result) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                reject(chrome.runtime.lastError.message);
            } else {
                let res = result.items ? result.items : [{ itemName: '', number: 0, id: uuid() }];

                res = res.length ? res : [{ itemName: '', number: 0, id: uuid() }];

                res.forEach(item => {
                    item.id = item.id ? item.id : uuid();
                });

                storageSync(res);
                resolve(res);
            }
        });
    });
};

export const storageSync = items =>
    chrome.storage.sync.set({ items }, function() {
        console.log('storage synced', items);
    });
