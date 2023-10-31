chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
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
                setTimeout(() => {
                    document.location.reload();
                }, totalMilliseconds)
            } else {
                const mineBtn = document.getElementsByClassName("modal-groups")[0];
                console.log("mineBtn", mineBtn)
                if (!mineBtn) window.location.reload();
                mineBtn.firstElementChild.click()
                setTimeout(() => {
                    document.getElementsByClassName("btn-special")[1].click()
                    console.log("reload in 28800000 ms")
                    totalMilliseconds = 28800000
                    setTimeout(() => {
                        window.location.reload()
                    }, totalMilliseconds)
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
            console.log(result[0], "result");
        })
    }
})