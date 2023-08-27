let myURL = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const URLFromLocalStorage = JSON.parse( localStorage.getItem("myURL") )
const tabBtn = document.getElementById("tab-btn")


document.querySelectorAll('.button').forEach(button => button.addEventListener('dblclick', e => {
    if(!button.classList.contains('delete')) {
    button.classList.add('delete');
    setTimeout(() => button.classList.remove('delete'), 3200);
    }
    e.preventDefault();
    }))


if (URLFromLocalStorage) {
    myURL = URLFromLocalStorage
    render(myURL)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myURL.push(tabs[0].url)
        localStorage.setItem("myURL", JSON.stringify(myURL) )
        render(myURL)
    })
})

function render(URL) {
    let listItems = ""
    for (let i = 0; i < URL.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${URL[i]}'>
                    ${URL[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myURL = []
    render(myURL)
})

inputBtn.addEventListener("click", function() {
    myURL.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myURL", JSON.stringify(myURL) )
    render(myURL)
})