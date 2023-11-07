let remainingTime = null;
const getAlarm = () => {
    chrome.alarms.get('mine-celia-alarm').then((alarm) => {
        if (alarm) {
            // Do something when the user clicks the extension
            remainingTime = new Date(alarm.scheduledTime).getTime() - new Date().getTime();
            chrome.runtime.sendMessage(remainingTime);
        }

    });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'userClick') {
        // Do something when the user clicks the extension
        getAlarm();
    }
});

chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.tabs.query({}, (tabs) => {
        const celiaTab = tabs.find((tab) => tab.url.startsWith("https://app.celia.finance/app/mine"));
        if (celiaTab) {
            chrome.tabs.reload(celiaTab.id)
        } else {
            chrome.tabs.create({ url: "https://app.celia.finance/app/mine", active: false });
        }
    });
});

const miner = async () => {
    return new Promise((resolve) => {
        const waitForAnyElement = (selectors) => {
            return new Promise((resolve) => {
                const observer = new MutationObserver((mutationsList) => {
                    mutationsList.forEach((mutation) => {
                        for (const selector of selectors) {
                            const elements = mutation.target.querySelectorAll(selector);
                            if (elements.length > 0) {
                                observer.disconnect();
                                resolve(elements[0]);
                            }
                        }
                    });
                });

                observer.observe(document.body, { childList: true, subtree: true });
            });
        };

        waitForAnyElement(["h4", ".modal-groups"]).then(() => {
            let totalMilliseconds = 0
            const hours = Array.from(document.querySelectorAll("h4")).find(el => el.textContent === "Hour(s)")?.previousElementSibling?.textContent;
            const minutes = Array.from(document.querySelectorAll("h4")).find(el => el.textContent === "Minute(s)")?.previousElementSibling?.textContent;
            const seconds = Array.from(document.querySelectorAll("h4")).find(el => el.textContent === "Second(s)")?.previousElementSibling?.textContent;
            if (hours && minutes && seconds) {
                totalMilliseconds = parseInt(hours) * 60 + parseInt(minutes) + parseInt(seconds) / 60;
            } else {
                const mineBtn = document.getElementsByClassName("modal-groups")[0];
                console.log("mineBtn", mineBtn)
                if (!mineBtn) window.location.reload();
                mineBtn.firstElementChild.click()
                totalMilliseconds = 485;
                setTimeout(() => {
                    document.getElementsByClassName("btn-special")[1].click()
                }, 4000)
            }
            resolve(totalMilliseconds + 3);
        })
    });
}

chrome.alarms.clearAll();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && String(tab.url).includes('celia.finance')) {
        chrome.tabs.query({}, function(tabs) {
            if (tabs.some(tab => tabId == tab.id)) {
              chrome.scripting.executeScript({
                  target: { tabId: tab.id },
                  function: miner
              }, async (result) => {
                  if (result && result[0]?.result > 0) {
                      const delay = result[0].result;
                      await chrome.alarms.create('mine-celia-alarm', { delayInMinutes: delay })
                      getAlarm();
                  }
              })
            }
        });
    }
})