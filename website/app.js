/* Global Variables */
let zipCode = document.getElementById('zip')
let feeling = document.getElementById('feelings')
let formSubmitWeather = document.getElementById('submitForm');


// when submit weather form
formSubmitWeather.addEventListener('submit', (e) => {
    e.preventDefault();

    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

    let weatherObj = {
        zipCode: zipCode.value,
        feeling: feeling.value,
    };

    // All Api Information
    const apiKey = 'abfdb6607d48d78c9bc9e74abfa87f0e';
    
    // Get Api Weather App With My api Key
    const apiInformation = async function() {
        await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${weatherObj.zipCode},us&appid=${apiKey}`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(data => {
                let postWeather = {
                    temp: data.main.temp,
                    date: newDate,
                    feeling: weatherObj.feeling
                }
                let temp = data.main.temp;
                // Post Data to Api 
                const addData = async function() {
                    return await fetch(`http://localhost:8000/postData`, {
                            method: "POST",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(postWeather)
                        })
                        .then(res => res.json())
                        .then(data => console.log(data))

                }
                addData();
                getData()
            })
            .catch(err => console.log("err", err))
    }
    apiInformation();
    // Post Data in server 


})


// let zipCodeInfo = function(objData){
//     apiInformation(objData.zipCode).then(zip => {
//         objData.temp = zip.list[0].main.temp;
//     })
// }
// console.log(zipCodeInfo());

const getData = async function() {
    let showWeather = []
    return await fetch(`http://localhost:8000/getData`)
        .then(res => res.json())
        .then(data => {
            showWeather += `
                <div id="date"> Date: ${data.date}</div>
                <div id="temp">Temp: ${data.temp}</div>
                <div id="content">Feeling: ${data.feeling}</div>
            `
            document.getElementById('entryHolder').innerHTML = showWeather
        })
        .catch(err => console.log("err", err))
}