
let star = document.querySelectorAll('i')
console.log(star)
for(let i=0; i<star.length; i++){
    star[i].addEventListener('click', function(){
        console.log(i+1)
    })
}

let name = document.getElementById('name').value
let review = document.getElementById('review').value

let btn_review = document.getElementById('btn_review').value

// btn_review.addEventListener('click', function(){
    
// })

console.log(window.location.hostname)
