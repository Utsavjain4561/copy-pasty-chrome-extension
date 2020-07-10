console.log("Popup is running");
let _clipboardList = document.querySelector("#clipboard_list");
const addClipboardListItem = (text)=>{
    console.log("Text is ",text);
    let listItem = document.createElement("li"),
        listDiv = document.createElement("div"),
        listSpan = document.createElement("span"),
        listText = document.createTextNode(text);
    listSpan.appendChild(listText)
    listDiv.appendChild(listSpan)
    listItem.appendChild(listDiv);
    _clipboardList.appendChild(listItem);

    listItem.addEventListener('click',(event)=>{
        let {textContent} = event.target;
        let index = list.indexOf(textContent);
        if (index !== -1)
            list.splice(index,1);
        list.unshift(textContent);
        _clipboardList.innerHTML = "";
        chrome.storage.local.set({'list':list},()=>getClipboardText());

        navigator.clipboard.writeText(textContent)
        .then(()=>console.log(`Text saved to clipboard`))
        .catch(err=>console.log(err));
    })
}
const getClipboardText = ()=>{
	chrome.storage.local.get(['list'],clipboard=>{
        
        clipboard.list.forEach(item => addClipboardListItem(item));})
}
getClipboardText();
