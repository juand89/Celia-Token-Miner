chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
});
const miner = async () => {
  await new Promise((resolve) => {
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
    waitForAnyElement(["h4", ".modal-groups"]).then((element) => {
      console.log(element, "element")
      if (element.constructor.name === "HTMLHeadingElement") {
        const hours = Array.from(document.querySelectorAll("h4")).find(el => el.textContent === "Hour(s)")?.previousElementSibling?.textContent;
        const minutes = Array.from(document.querySelectorAll("h4")).find(el => el.textContent === "Minute(s)")?.previousElementSibling?.textContent;
        const seconds = Array.from(document.querySelectorAll("h4")).find(el => el.textContent === "Second(s)")?.previousElementSibling?.textContent;
        const totalMilliseconds = (parseInt(hours) * 3600000 + parseInt(minutes) * 60000 + parseInt(seconds) * 1000) + 180000;
        console.log({ totalMilliseconds })
        setTimeout(() => {
          resolve();
          document.location.reload();
        }, totalMilliseconds)
      } else {
        const mineBtn = document.querySelector(".modal-groups");
        if (mineBtn) {
          console.log("mineBtn", mineBtn)
          mineBtn.firstElementChild.click()
          waitForAnyElement(["btn-special"]).then(() => {
            document.getElementsByClassName("btn-special")[0].click()
            setTimeout(() => {
              resolve();
              document.location.reload()
            }, 4000)
          })
        }
      }

    })
  })
}
let scriptExecuted = false;
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && String(tab.url).includes('celia.finance')) {
    if (!scriptExecuted) {
      scriptExecuted = true;
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: miner,
      }, () => {
        scriptExecuted = false;
      })
    }
  }
})
