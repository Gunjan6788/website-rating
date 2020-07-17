
//data of the stars

let star = document.querySelectorAll('i')
console.log(star)
for(let i=0; i<star.length; i++){
    star[i].addEventListener('click', function(){
        console.log(i+1)
    })
}



// fetching name and review by the user

let name = document.getElementById('name').value
let review = document.getElementById('review').value



// getting data of current domain

var domain = ""

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        var tab = tabs[0];
        var url = new URL(tab.url)
        domain = url.hostname
    });

// operation after button click

let btn_review = document.getElementById('btn_review')

btn_review.addEventListener('click', function(){
    event.preventDefault()
    
    // set and get
    
})