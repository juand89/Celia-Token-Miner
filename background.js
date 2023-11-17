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
            if (hours && minutes && seconds) {
                const totalMilliseconds = (parseInt(hours) * 3600000 + parseInt(minutes) * 60000 + parseInt(seconds) * 1000) + 180000;
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
                  setTimeout(() => {
                    window.location.reload()
                }, 4000)
              }, 4000)
            }
            resolve();
        }
      setTimeout(setTimeoutHandler, 3000);
    })
    miner();
}
let scriptExecuted = false;
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && String(tab.url).includes('celia.finance')) {
        if (!scriptExecuted) {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              function: miner,
            }, () => {
                scriptExecuted = false;
            })
        }
      }
  })
