//console.log('Client side javascript file has loaded!')

//example to show how fetch renders the response object(string/array/json object) and throws it onto the console.
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//const entry = document.getElementById("entry"),
//const clear = document.getElementById("clear");


//messageOne.textContent='From js'

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault() //prevent the form from refreshing when you submit(event happpens)

    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => { //no deconstruction of data
        if(data.error){
            messageOne.textContent = data.error
        }
        else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
setTimeout(() => {
    search.value=""
}, 600)

})

