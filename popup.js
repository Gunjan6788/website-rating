var domain = ""
var send_response = []

//current domain name
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    var tab = tabs[0];
    var url = new URL(tab.url)
    domain = url.hostname

    chrome.storage.local.set({'domain':domain}, function(){
        console.log("Data Entered")
    })

    var app = document.getElementById("site")
    app.innerHTML = domain

    //api to fetch data
    var user = {
        "website": domain
    }
    get_data(user)

    setTimeout(function(){
        if(send_response.length != 0){
            show_ratings(send_response)
        }
        else{
            chrome.storage.local.set({'avg':"0"}, function(){
                console.log("Data Entered")
            })
        }
        
    }, 1000)
    

});

// get data 
function get_data(user) {
    let response = fetch('http://reviews.gunjan.tech/review/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(res => send_response = res["data"])
}

let total_stars, star_1, star_2, star_3, star_4, star_5, len

setTimeout(function () {
    len = send_response.length
    total_stars = 0
    star_1 = 0
    star_2 = 0
    star_3 = 0
    star_4 = 0
    star_5 = 0
    for (var j = 0; j < send_response.length; j++) {
        total_stars += send_response[j]["stars"]
        if (Number(send_response[j]["stars"]) === 1) {
            star_1 += send_response[j]["stars"]
        }
        else if (Number(send_response[j]["stars"]) === 2) {
            star_2 += send_response[j]["stars"]
        }
        else if (Number(send_response[j]["stars"]) === 3) {
            star_3 += send_response[j]["stars"]
        }
        else if (Number(send_response[j]["stars"]) === 4) {
            star_4 += send_response[j]["stars"]
        }
        else {
            star_5 += send_response[j]["stars"]
        }

    }

    for (var k = send_response.length-1; k > send_response.length-4; k--) {
        if (send_response.length !== 0) {
            var reviews = document.getElementById("reviews")

            var reviews_card = document.createElement("div")
            reviews_card.setAttribute("class", "card rounded mt-2")
            reviews_card.style.maxWidth = '450px'
            reviews_card.style.maxHeight = '100px'
            reviews_card.style.fontSize = '12px'
            reviews_card.style.lineHeight = '1.2em'

            var reviews_header = document.createElement("div")
            reviews_header.setAttribute("class", "card-header d-flex bd-highlight")

            var user_name = document.createElement("div")
            user_name.setAttribute("class", "bd-highlight")
            user_name.innerHTML = send_response[k]["name"]

            var rating = document.createElement("div")
            rating.setAttribute("class", "ml-auto bd-highlight")
            rating.innerHTML = send_response[k]["stars"] + ' ' + 'stars'

            var reviews_body = document.createElement("div")
            reviews_body.setAttribute("class", "card-body")

            var blckqoute = document.createElement("blockquote")
            blckqoute.setAttribute("class", "blockquote")

            var cmt = document.createElement("div")
            cmt.innerHTML = send_response[k]["review"]
            cmt.style.fontSize = '12px'
            cmt.style.marginTop = '-10px'

            var date = send_response[k]["date"].split(" ")
            var ftr = document.createElement("footer")
            ftr.setAttribute("class", "blockquote-footer")
            ftr.innerHTML = date[0]
            ftr.style.fontSize = '10px'


            blckqoute.appendChild(cmt)
            blckqoute.appendChild(ftr)

            reviews_body.appendChild(blckqoute)
            reviews_header.appendChild(user_name)
            reviews_header.appendChild(rating)
            reviews_card.appendChild(reviews_header)
            reviews_card.appendChild(reviews_body)

            reviews.appendChild(reviews_card)
        }
        else{
            var reviews = document.getElementById("reviews")
            reviews.setAttribute("class", "mt-5 text-danger")
            reviews.style.fontSize = "20px"
            reviews.innerHTML = "NO DATA FOUND. It starts with you!"
        }
    }
}, 1000)


//data of the stars
var star = document.querySelectorAll('i')
console.log(star)
let flag = true
var stars_given = 0

if (flag == true) {
    for (let i = 0; i < star.length; i++) {

        //cahange color of data
        star[i].addEventListener('mouseover', function () {
            star[i].classList.remove("far");
            star[i].classList.add("fas");
        })

        star[i].addEventListener('mouseout', function () {
            star[i].classList.remove("fas");
            star[i].classList.add("far");
            star[i].addEventListener('click', function () {
                flag = false
                stars_given = i + 1

                star[i].addEventListener('mouseout', function () {
                    star[i].classList.remove("far");
                    star[i].classList.add("fas");
                    for (let j = 0; j < stars_given; j++) {
                        // alert(j)
                        star[j].classList.remove("far");
                        star[j].classList.add("fas");
                        star[j].style.color = "#FFC831"
                    }
                })

            })
        })
    }

}

// add data to database
let btn_review = document.getElementById('btn_review')
var complete = ""

btn_review.addEventListener('click', function () {
    event.preventDefault()

    // fetching name and review by the user
    let name = document.getElementById('name').value
    let review = document.getElementById('review').value


    //api call for adding data to database
    let user = {
        "name": name,
        "review": review,
        "stars": stars_given,
        "website": domain
    }

    let website = {
        "website": domain
    }

    fetch('http://reviews.gunjan.tech/review/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(res => complete = res['message'])
        .then(res => window.location.reload())

})

// redirect to new page

function clickHandler(e) {
    chrome.tabs.update({ url: "./redirect.html"});
    window.close();
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('click-me').addEventListener('click', clickHandler);
});


//show the real rating of the page

function show_ratings(my_data){
    var tot = 0
    var rev = 0

    var pos = document.getElementById("stat")

    for(var i=0; i< my_data.length; i++){
        tot ++
        rev += my_data[i]["stars"]
        pos.innerHTML = Math.ceil(rev/tot)
    }

    avg_rating = Math.ceil(rev/tot)
    
    

    var color = ["#FF0000", "#FFFF00", "#FFFF00", "#7FFF00", "#00FF00"]

    pos.style.backgroundColor = color[avg_rating]

    chrome.storage.local.set({'avg':avg_rating}, function(){
        console.log("Data Entered")
    })
}
