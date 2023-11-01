let timerId = null;
let remainingTime = null;
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'userClick' && timerId !== null) {
        // Do something when the user clicks the extension
        const msToEnd = remainingTime - new Date().getTime();
        console.log('User clicked the extension.', timerId, msToEnd);
        chrome.runtime.sendMessage(msToEnd);
    }
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
            console.log("finding the timer ", hours, minutes, seconds);
            if (hours && minutes && seconds) {
                totalMilliseconds = (parseInt(hours) * 3600000 + parseInt(minutes) * 60000 + parseInt(seconds) * 1000) + 300000;
            } else {
                const mineBtn = document.getElementsByClassName("modal-groups")[0];
                console.log("mineBtn", mineBtn)
                if (!mineBtn) window.location.reload();
                mineBtn.firstElementChild.click()
                totalMilliseconds = 28800000 + 300000;
                setTimeout(() => {
                    document.getElementsByClassName("btn-special")[1].click()
                }, 4000)
            }
            resolve(totalMilliseconds);
        })
    });
}
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && String(tab.url).includes('celia.finance')) {
        console.log(tab.url);
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: miner
        }, (result) => {
            if (result[0]?.result > 0) {
                const delay = result[0].result;
                clearTimeout(timerId);
                remainingTime = new Date().getTime() + delay;
                timerId = setTimeout(() => {
                    chrome.tabs.query({}, (tabs) => {
                        const celiaTab = tabs.find((tab) => tab.url.startsWith("https://app.celia.finance/app/mine"));
                        if (celiaTab) {
                          chrome.tabs.reload(celiaTab.id)
                        } else {
                          chrome.tabs.create({ url: "https://app.celia.finance/app/mine" });
                        }
                      });
                }, delay);
                chrome.runtime.sendMessage(result[0].result);
            }
        })
    }
})