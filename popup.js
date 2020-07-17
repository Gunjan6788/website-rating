
// getting data of current domain

var domain = ""

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        var tab = tabs[0];
        var url = new URL(tab.url)
        domain = url.hostname
    });

// operation after button click

let btn_review = document.getElementById('btn_review')


//data of the stars

var star = document.querySelectorAll('i')

var stars_given = 0

for(let i=0; i<star.length; i++){
    star[i].addEventListener('click', function(){
        stars_given = i+1
        alert(i+1)
    })
}

btn_review.addEventListener('click', function(){
    event.preventDefault()

    // fetching name and review by the user

    let name = document.getElementById('name').value
    let review = document.getElementById('review').value

    
    
})