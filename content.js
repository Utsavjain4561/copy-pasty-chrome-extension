console.log("copy-pasty-chrome-extension");


// Listener will trigger at CTRL+C or mouse copy event
document.addEventListener('copy',function(event){
    // console.log("Content copied");

    //Add selected data to the clipboard
    let selectedWord = window.getSelection().toString();
    chrome.storage.local.get(['list'],function(result){
    	let localList = result.list;
    	console.log(typeof localList);
    	if (typeof localList === 'undefined')
    		localList = [];
    	localList.push(selectedWord);
    	chrome.storage.local.set({'list':localList},function(arg){
    		console.log(localList);
    	});
    });
});

window.onkeydown = keyPressed;
function keyPressed(event){
	let key = event.key;
	if (key==="Control")
		return;
	 if (event.ctrlKey&&key==='.') {
         console.log("Key pressed");
    // Even though event.key is not 'Control' (e.g., 'a' is pressed),
    chrome.storage.local.get(['list'],function(result){
    	console.log('hello');
    	console.log(result.list);
    })
  } else {
    // alert(`Key pressed ${key}`);
  }
	// console.log(key);
}
