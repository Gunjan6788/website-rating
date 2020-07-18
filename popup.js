
// getting data of current domain

var domain = ""
var send_response = []

// chrome.tabs.query({active: true, currentWindow: true}, tabs => {
//         var tab = tabs[0];
//         var url = new URL(tab.url)
//         domain = url.hostname

//         var app = document.getElementById("site")
//         app.innerHTML = domain

//         //api to fetch data

//         var user = {
//             "website": domain
//         }

//         let response = fetch('http://reviews.gunjan.tech/review/get', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8'
//             },
//             body: JSON.stringify(user)
//             })
//             .then(response=> response.json())
//             .then(res=>send_response=res["data"])

//     });

// operation after button click

let btn_review = document.getElementById('btn_review')



//data of the stars
var star = document.querySelectorAll('i')
console.log(star)
let flag = true
var stars_given = 0

if (flag==true) {
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



//for visuals
// setTimeout(function(){
//     for(var k = 0; k < send_response.length; k++){

//         // dom code for details
//         alert(send_response[k]["name"])

//     }
// }, 1000)


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


    fetch('http://reviews.gunjan.tech/review/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(res => alert(res))

})

// redirect to new page
function clickHandler(e) {
    chrome.tabs.update({url: "./redirect.html"});
    window.close();
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('click-me').addEventListener('click', clickHandler);
});