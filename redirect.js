//getting the data from local storage

let items = "www.flipkart.com"
var send_response = []

chrome.storage.local.get('domain',function(data){
        if(data.domain){
            items = data.domain
            document.getElementById("site").innerHTML = items

            var user = {
                "website": items
            }
        
            fetch_rev(user)    
            
        }
    })

//fetching the reviews from api
function fetch_rev(param){
    let response = fetch('http://reviews.gunjan.tech/review/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(param)
            })
            .then(response=> response.json())
            .then(res=>send_response=res["data"])
}




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
            h5.setAttribute("class", "card-title font-weight-bolder col-6")
            h5.innerHTML = send_response[i]["name"]

            var h5_b = document.createElement("h5")
            h5_b.setAttribute("class", "card-title font-weight-bolder col-6 text-right")
            h5_b.innerHTML = send_response[i]["stars"]

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

