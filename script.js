window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');

    function setIcons(icon, iconID){
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, skycons[currentIcon]);
    };

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/ec9fed3834754c53c13c91a30d66be71/${lat},${long}`;

            fetch(api)
                .then(response=>{
                    return response.json();
            })
            .then(data => {
                console.log(data)
                const {temperature, summary, icon} = data.currently;
                //set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //seticon
                setIcons(icon, document.querySelector('.icon'));
                //change to celcius

            })
        });
    };
});