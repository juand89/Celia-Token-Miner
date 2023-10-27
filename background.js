chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
  });
const miner = async () => {
    await new Promise((resolve) =>
    {
        const setTimeoutHandler = ()=> {
            // chrome.runtime.sendMessage("send message from miner");
            console.log("hello this is the miner")
            resolve();
        }
      setTimeout(setTimeoutHandler, 1000);
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