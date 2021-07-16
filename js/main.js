const form = document.querySelector('.search');

const ip = document.querySelector(".ip")
const ipLocation = document.querySelector(".location")
const ipTimezone = document.querySelector(".timezone")
const ipIsp = document.querySelector(".isp")

const map = document.querySelector("#mapid")

const getData = (ip) => {
    console.log(ip);
    const ipData = fetch(`https://geo.ipify.org/api/v1?apiKey=at_uk8DYoDVRrqa1rsbC4Aqz5eyHUtcj&ipAddress=${ip}`)
    .then(response => response.json())
    .then(data => renderData(data))
    .catch(err => console.log(err))
}


const renderMap = ({lat, lng}) => {

    if (mymap != undefined) {
        mymap.outerHTML = "";
        mymap.off();
        mymap.remove();
    } 

    var mymap = L.map('mapid').setView([lat, lng], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYnJpZ2l0dGF2YXJnYSIsImEiOiJja3F3aHFia2Iwb2ZnMm9xYWtuajJscDZjIn0.gnNm7k7H5whjrkEnJcD0LA'
    }).addTo(mymap);
};

getData('192.212.174.101');


const renderData = ({ ip: fetchedIp, location, isp}) => {
    const { city, region, postalCode, timezone, lat, lng } = location;
    ip.innerHTML = fetchedIp
    ipLocation.innerHTML = `${city}, ${region}, ${postalCode}`
    ipTimezone.innerHTML = `UTC ${timezone}`
    ipIsp.innerHTML = isp
    renderMap(location);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('.search input').value;
    getData(input);
});
