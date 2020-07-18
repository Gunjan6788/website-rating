
// just to empty data set!
// chrome.storage.sync.set({'name': [], 'review': [], 'domain': []}, function(){
//         console.log("Data Entered")
//     })

// getting data of current domain

var domain = ""

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        var tab = tabs[0];
        var url = new URL(tab.url)
        domain = url.hostname

        var app = document.getElementById("site")
        app.innerHTML = domain
        // alert(domain)
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


    //getting our data through chrome storage

    // var user_name = []
    // var user_review = []
    // var site = []

    // chrome.storage.sync.get(['name', 'review', 'domain'],function(data){
    //     if(data.name){
    //         user_name.push(data.name)
    //         user_review.push(data.review)
    //         site.push(data.domain)

    //         alert(data.name)
    //         alert(data.review)
    //         alert(data.domain)
    //     }
        
    // })

    // setTimeout(function(){

    //     //adding the new data
    //     user_name.push(name)
    //     user_review.push(review)
    //     site.push(domain)

    //     //adding the new data in the dataset
    //     chrome.storage.sync.set({'name': user_name, 'review': user_review, 'domain': site}, function(){
    //     console.log("Data Entered")
    // })
    
    // },1000)
    
    
    //getting data using mysql

    let user = {
        "name": name,
        "review": review,
        "stars": stars_given,
        "website": domain
      }

    var send_response = ""
      
      let response = await fetch('xyz.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });
      
      let result = await response.json();

      send_response = result.message

    
})
