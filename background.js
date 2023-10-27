chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
  });
const miner = async () => {
    await new Promise((resolve) =>
    {
        const setTimeoutHandler = ()=> {
            // chrome.runtime.sendMessage("send message from miner");
            const hours = Array.from(document.querySelectorAll("h4")).find(el => el.textContent === "Hour(s)")?.previousElementSibling?.textContent;
            const minutes = Array.from(document.querySelectorAll("h4")).find(el => el.textContent === "Minute(s)")?.previousElementSibling?.textContent;
            const seconds = Array.from(document.querySelectorAll("h4")).find(el => el.textContent === "Second(s)")?.previousElementSibling?.textContent;
            console.log("finding the timer ", hours, minutes, seconds);
            if (hours && minutes && seconds) {
                const totalMilliseconds = (parseInt(hours) * 3600000 + parseInt(minutes) * 60000 + parseInt(seconds) * 1000) + 300000;
                setTimeout(() => {
                    document.location.reload();
                }, totalMilliseconds)
            } else {
                // const mineBtn =
            }
            resolve();
        }
      setTimeout(setTimeoutHandler, 2000);
    })
    miner();
}
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && String(tab.url).includes('celia.finance')) {
        console.log(tab.url );
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: miner,
        })
      }
  })