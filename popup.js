console.log("Popup is running");
let _clipboardList = document.querySelector("#clipboard_list");
function getClipboardText(){
	chrome.storage.local.get(['list'],clipboard=>{
        let list = clipboard.list;
        if (typeof list !== undefined)
        list.forEach(item => {
            console.log(item);
            addClipboardListItem(item)
        });
    });
}

function getThumbnail(textContent){
   
    	console.log(textContent);
    	let ind = textContent.indexOf('https://www.youtube.com/');
    	if (ind===0)
    	{
    		let videoId = "";
    		let idIndex = textContent.indexOf('watch?v=');
    		let endIndex = textContent.indexOf('&');
    		console.log(`${idIndex} ${endIndex}`);
    		if (endIndex !== -1)
    			videoId = textContent.substring(idIndex+8,endIndex);
    		else
                videoId = textContent.substring(idIndex+8,textContent.length);
            let url = `https://img.youtube.com/vi/${videoId}/1.jpg`;
            console.log(`https://img.youtube.com/vi/${videoId}/1.jpg`);
            return {
                sourceUrl:textContent,
                imageUrl:url
            };
        }
        return {
            sourceUrl:"",
            imageUrl:""
        }
        ;
}
function addClipboardListItem(text){
    

    let {sourceUrl,imageUrl} = getThumbnail(text);
    let listItem = document.createElement("li"),
        listDiv = document.createElement("div"),
        listPara = document.createElement("p"),
        listText = document.createTextNode(text),
        popupDiv = document.createElement('div'),
        popupLink = document.createElement('a'),
        imagePopup  = document.createElement('img');
    
    if(imageUrl.length>0){
        console.log("IMage Url found")
        imagePopup.src = imageUrl;
        popupLink.href = sourceUrl;
        popupLink.target='_blank';
        popupLink.appendChild(imagePopup);
        listDiv.appendChild(popupLink);
        
    }

    listPara.appendChild(listText)
    listDiv.appendChild(listPara);
    listItem.appendChild(listDiv);

    _clipboardList.appendChild(listItem);

    
    listItem.addEventListener('click',(event)=>{
        let {textContent} = event.target;
        navigator.clipboard.writeText(textContent)
        .then(()=>{
            console.log(`Text saved to clipboard`);
            chrome.storage.local.get(['list'],clipboard=>{
                let list = clipboard.list;
                let index = list.indexOf(textContent);
                if (index !== -1)
                    list.splice(index,1);

                list.unshift(textContent);
                _clipboardList.innerHTML = "";
                chrome.storage.local.set({'list':list},()=>getClipboardText());
            });
        });
    });

    // listItem.addEventListener('mouseover',(event)=>{
    //     popupDiv.style.visibility = 'visible';
    //     listItem.addEventListener('mouseout',(event)=>{
    //        popupDiv.style.visibility = 'hidden'
    //     });
    

    // });
}

getClipboardText();