
// function templateGenerator (list){
//     let template = '';
//     template += '<div class="card-weather" >';
//     template += '<p class="title-card">Current weather</p>' +
//     '<table class="current-weather">' +
//     '<tr><th>City, country:</th><td>'+ list.name + ", " + list.sys.country +'</td></tr>' +
//     '<tr><th>Temperature:</th><td>' + list.main.temp + ' &degC</td></tr>' +
//     '<tr><th>Feels like:</th><td>' + list.main.feels_like + ' &degC</td></tr>' +
//     '<tr><th>Temp max:</th><td>' + list.main.temp_max + ' &degC</td></tr>' +
//     '<tr><th>Temp min:</th><td>' + list.main.temp_min + ' &degC</td></tr>' +
//     '<tr><th>Humidity:</th><td>' + list.main.humidity + '%</td></tr>' +
//     '<tr><th>Pressure:</th><td>' + list.main.pressure + ' mm</td></tr>';
//     template += '<tr><th>Wind:</th><td>' + list.wind.deg + '<span> deg, </span>' + list.wind.speed + '<span> m/s</span></td></tr>';
//     template += '</table></div>';

//     $('.weather-api').prepend(template);
// }

// let $city = $('.city');
// let $btn = $('.btn');
// let notes = null;

// $btn.on('click', function(){
//     let text = $city.val();
//     $.getJSON('https:/api.openweathermap.org/data/2.5/weather?q='+text+'&appid=34655ff103ac8a080f3e61087d07ecbf&units=metric')
//     .done(function (data) {
//         console.log(data);       
//         templateGenerator(data);        
//     });  
// });



function templateGenerator (el, list){
    let template = '';
    template += '<div class="card-weather" >';
    template += '<p class="title-card">Current weather</p>' +
    '<table class="current-weather">' +
    '<tr><th>City, country:</th><td>'+ list.name + ", " + list.sys.country +'</td></tr>' +
    '<tr><th>Temperature:</th><td>' + list.main.temp + ' &degC</td></tr>' +
    '<tr><th>Feels like:</th><td>' + list.main.feels_like + ' &degC</td></tr>' +
    '<tr><th>Temp max:</th><td>' + list.main.temp_max + ' &degC</td></tr>' +
    '<tr><th>Temp min:</th><td>' + list.main.temp_min + ' &degC</td></tr>' +
    '<tr><th>Humidity:</th><td>' + list.main.humidity + '%</td></tr>' +
    '<tr><th>Pressure:</th><td>' + list.main.pressure + ' mm</td></tr>';
    template += '<tr><th>Wind:</th><td>' + list.wind.deg + '<span> deg, </span>' + list.wind.speed + '<span> m/s</span></td></tr>';
    template += '</table></div>';  
    $('.weather-api').append(template);
}

let $city = $('.city');
let $btn = $('.btn');
let notes = null;

$btn.on('click', function(){
    let text = $city.val();
    let connect = $.getJSON('https:/api.openweathermap.org/data/2.5/weather?q='+text+'&appid=34655ff103ac8a080f3e61087d07ecbf&units=metric')
    .done(function (data) {
         console.log(data);
         if (notes) {
            notes.push({
                city: text
            });
        } else {
            notes = [
                {
                   city: text
                }
            ]
        }      
        templateGenerator(notes, data)     
        localStorage.setItem('test', JSON.stringify(notes));   
    });
});


if (localStorage.getItem('test')) {
    notes = JSON.parse(localStorage.getItem('test'));
    console.log(notes);

    notes.forEach(function(elm) {
        $.getJSON('https:/api.openweathermap.org/data/2.5/weather?q='+elm.city+'&appid=34655ff103ac8a080f3e61087d07ecbf&units=metric')
    .done(function (data) {
         console.log(data);         
        templateGenerator(notes,data)
    });
    });
}