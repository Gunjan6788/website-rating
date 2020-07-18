//getting the data from local storage

let items = "www.flipkart.com"

if (localStorage.getItem('data')) {
    items = JSON.parse(localStorage.getItem('data'))
  } 
  else {
    items = "www.flipkart.com"
  }

  var top = document.getElementById("site").innerHTML = items

//fetching the reviews from api

var user = {
    "website": items
}

var send_response = []
      
let response = fetch('http://reviews.gunjan.tech/review/get', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
})
.then(response=> response.json())
.then(res=>send_response=res["data"])

setTimeout(function(){
    console.log(send_response)

    for(var i = 0; i < send_response.length; i++){
        if(send_response[i]["website"] == items){

            var app = document.getElementById("reviews")

            var main_div = document.createElement("div")
            main_div.setAttribute("class", "col-7 mt-5 card bg-primary mx-auto")

            var div_sec = document.createElement("div")
            div_sec.setAttribute("class", "card-body")

            var h5 = document.createElement("h5")
            h5.setAttribute("class", "card-title font-weight-bolder")
            h5.innerHTML = send_response[i]["name"]

            var h6 = document.createElement("h6")
            h6.setAttribute("class", "card-subtitle mb-2 text-dark")
            var date = send_response[i]["date"].split(" ")
            h6.innerHTML = date[0]

            var p = document.createElement("p")
            p.setAttribute("class", "card-text text-light")
            p.innerHTML = send_response[i]["review"]

            div_sec.appendChild(h5)
            div_sec.appendChild(h6)
            div_sec.appendChild(p)

            main_div.appendChild(div_sec)

            app.appendChild(main_div)

        }
        
    }

},1000)

{/* <div class="col-4 card bg-secondary mx-auto">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div> */}
    

