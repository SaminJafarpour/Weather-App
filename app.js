const getLoc= async ()=>{
    const locationUrl='http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone'
    const response= await fetch(locationUrl);
    const data=response.json();
    return data
}

const getWeather= async (lat,lon)=>{
    const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b3d51c0fcaf538883d620be11432911f`
    const response= await fetch(weatherUrl);
    const data=response.json();
    return data
}

const getDayOrNight=()=>{
    let dayOrNight;
    let d = new Date();
    if (d.getHours() >= 6 && d.getHours()<=19){
        dayOrNight='Day'
    }else{
        dayOrNight='Night'
    }
}


function getIcon(weMain){
    let icon;
    switch (weMain) {
        case 'Thunderstorm':
            icon = `${weMain}.svg`;
            break;
        case 'Drizzle':
            icon = `${weMain}.svg`;
            break;
        case 'Rain':
            icon = `${weMain}.svg`;
            break;
        case 'Snow':
            icon = `${weMain}.svg`;
            break;
        case 'Clear':
            const DayOrNigh = getDayOrNight();
            icon = `${weMain}-${DayOrNigh}.svg`;
            break;
        case 'Clouds':
            icon = `${weMain}.svg`;
            break;
        case 'Smoke':
            icon = `${weMain}.png`;
            break;
    }
    return icon;
}


function getTemp(weTemp){
    const k = weTemp;
    const f = (k - 273.15) * 9/5 + 32;
    const c = k - 273.15;
    return temp = {kel:Math.floor(k), far:Math.floor(f), can:Math.floor(c)};
}

const loti = document.querySelector('.timezone');
let locIcon=document.querySelector('.icon');
const degSec=document.querySelector('.degree-section');
const degSecH2=document.querySelector('.degree-section h2');
const tempDes=document.querySelector('.temperature-description');
const unit=document.querySelector('.degree-section span');

getLoc()
.then(locData => {
    const timeZone = locData.timezone;
    loti.textContent = timeZone;
    return getWeather(locData.lat, locData.lon)
}).then(weData=>{
    const weTemp=weData.main.temp;
    const weMain=weData.weather[0].main;
    const weDes=weData.weather[0].description;
    console.log(weTemp , weMain, weDes)

    const iconName=getIcon(weMain);
    locIcon.innerHTML= `<img src='Weather icons/${iconName}'></img>`

    degSecH2.textContent=Math.floor(weTemp);
    unit.textContent='K'

    degSec.addEventListener('click', (e)=>{
        if(unit.textContent=='K'){
            degSecH2.textContent= getTemp(weTemp).far
            unit.textContent='F'

        }else if(unit.textContent=='F'){
            degSecH2.textContent= getTemp(weTemp).can
            unit.textContent='C'
        }else{
            degSecH2.textContent= getTemp(weTemp).kel
            unit.textContent='K'
        }
    })

    tempDes.textContent= weDes;
    
})

