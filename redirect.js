//getting the data from local storage

let items = "www.flipkart.com"
var send_response = []

chrome.storage.local.get('domain', function (data) {
    if (data.domain) {
        items = data.domain
        document.getElementById("site").innerHTML = items

        var user = {
            "website": items
        }

        fetch_rev(user)

    }
})

//fetching the reviews from api
function fetch_rev(param) {
    let response = fetch('http://reviews.gunjan.tech/review/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(param)
    })
        .then(response => response.json())
        .then(res => send_response = res["data"])
}




setTimeout(function () {
    console.log(send_response)

    for (var i = send_response.length - 1; i > 0; i--) {
        if (send_response[i]["website"] == items) {

            var app = document.getElementById("reviews")

            var main_div = document.createElement("div")
            main_div.setAttribute("class", "m-4 card border border-success col-10 mx-auto")
            main_div.style.backgroundColor = "#A5D6A7"

            var div_sec = document.createElement("div")
            div_sec.setAttribute("class", "card-body")

            var h5 = document.createElement("h5")
            h5.setAttribute("class", "card-title font-weight-bolder")
            h5.innerHTML = send_response[i]["name"]

            var h5_b = document.createElement("h5")
            h5_b.setAttribute("class", "card-title font-weight-bolder")
            h5_b.innerHTML = send_response[i]["stars"]

            var small = document.createElement("small")
            var date = send_response[i]["date"].split(" ")
            small.innerHTML = date[0]

            var p = document.createElement("p")
            p.setAttribute("class", "card-text")
            p.innerHTML = send_response[i]["review"]

            var i1 = document.createElement("i")
            var i2 = document.createElement("i")
            var i3 = document.createElement("i")
            var i4 = document.createElement("i")
            var i5 = document.createElement("i")

            for (let j = 0; j < 5; j++) {
                if (j <= send_response[i]["stars"]) {
                    if (j == 0){
                        i1.setAttribute("class", "fas fa-star fa-lg")
                        i1.style.color="#FFC831"
                    }
                    if (j == 1){
                        i2.setAttribute("class", "fas fa-star fa-lg")
                        i2.style.color="#FFC831"
                    }
                    if (j == 2){
                        i3.setAttribute("class", "fas fa-star fa-lg")
                        i3.style.color="#FFC831"
                    }
                    if (j == 3){
                        i4.setAttribute("class", "fas fa-star fa-lg")
                        i4.style.color="#FFC831"
                    }
                    if (j == 4){
                        i5.setAttribute("class", "fas fa-star fa-lg")
                        i5.style.color="#FFC831"
                    }
                }
                else{
                    if (j == 0){
                        i1.setAttribute("class", "far fa-star fa-lg")
                    }
                    if (j == 1){
                        i2.setAttribute("class", "far fa-star fa-lg")
                    }
                    if (j == 2){
                        i3.setAttribute("class", "far fa-star fa-lg")
                    }
                    if (j == 3){
                        i4.setAttribute("class", "far fa-star fa-lg")
                    }
                    if (j == 4){
                        i5.setAttribute("class", "far fa-star fa-lg")
                    }
                }
            }

            div_sec.appendChild(h5)
            div_sec.appendChild(small)
            div_sec.appendChild(p)
            div_sec.append(i1,i2,i3,i4,i5)

            main_div.appendChild(div_sec)

            app.appendChild(main_div)

        }

    }

}, 1000)

