export const getData = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['items'], function(result) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                reject(chrome.runtime.lastError.message);
            } else {
                let res = result.items ? result.items : [{ itemName: '', number: 0 }];

                resolve(res);
            }
        });
    });
};

export const storageSync = items =>
    chrome.storage.sync.set({ items }, function() {
        console.log('storage synced', items);
    });
