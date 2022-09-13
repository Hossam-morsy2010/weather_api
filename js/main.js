{//search value
let my_btn = document.querySelector(".my_btn")
let my_input = document.querySelector(".my_input")

my_btn.addEventListener("click",()=>{

  let my_country = my_input.value.toLowerCase()
  console.log(my_country);
  //weather API by fetch pattern


  fetch(`https://weatherdbi.herokuapp.com/data/weather/${my_country}`)
  .then((my_json)=> my_json.json())
  .then((my_json_arr)=>{
    console.log(my_json_arr);
    let my_region = my_json_arr.region
    let my_date_time = my_json_arr.currentConditions.dayhour
    let my_temprature_c = my_json_arr.currentConditions.temp.c
    let my_temprature_f = my_json_arr.currentConditions.temp.f
    let my_condition_comment = my_json_arr.currentConditions.comment
    let my_humidity = my_json_arr.currentConditions.humidity
    let my_precip = my_json_arr.currentConditions.precip
    let my_wind = my_json_arr.currentConditions.wind.km
    let my_icon_url = my_json_arr.currentConditions.iconURL
    let my_new_temp
    // weather main div
    let my_main = document.querySelector(".my_main")
    let my_details_div = 
    `
    <div class="col-10 main_div rounded-4 shadow-lg">
    <h1 class="text-white text-center mt-4 main_header text-capitalize">
      ${my_country}
    </h1>
    <hr class="text-white" />
    <div class="row justify-content-center mt-4">
      <div class="col-md-5 col-11 text-white">
        <!--start left column upper section-->
        <div class="d-flex text-center">
          <h4 class="me-2"><i class="fa-solid fa-location-dot"></i></h4>

          <p class="fs-4 align-items-center text-capitalize">
            ${my_region}
          </p>
        </div>
        <div class="d-flex">
          <h4 class="me-2"><i class="fa-regular fa-calendar"></i></h4>

          <p class="fs-4 align-items-center text-capitalize">
            ${my_date_time}
          </p>
        </div>
        <!--end left column upper section-->
        <!--start left column center section-->
        <div class="d-flex my-4">
          <h2 class="me-2 day_degree">${my_temprature_c}&#8451;|${my_temprature_f}&#8457;</h2>
        </div>
        <!--end left column center section-->
        <!--start left column lower section-->
        <div class="my-4">
          <h2>${my_condition_comment}</h2>
          <p class="mt-4">humidity: ${my_humidity}</p>
          <p>precipitation: ${my_precip}</p>
          <p>wind: ${my_wind}km/h</p>
        </div>
        <!--end left column lower section-->
      </div>

      <!--right column for icons-->
      <div class="col-md-5 d-md-block">
        <div class="col d-flex justify-content-center icons_div">
          <img
            src= ${my_icon_url}
            alt="icon url"
            class="weather_icons align-self-center"
          />
        </div>
      </div>
    </div>
    <div class="row justify-content-evenly mt-4 mb-4 my_predict">

    </div>
  </div>
    `
    my_main.innerHTML = my_details_div
    //array of the next days' predictions
    let my_array = my_json_arr.next_days

    for(i = 0 ; i < 3; i++){
      let my_day = my_array[i].day
      let my_com = my_array[i].comment
      let my_max_temp = my_array[i].max_temp.c
      let my_min_temp = my_array[i].min_temp.c

      my_new_temp = 
      `
      <div
      class="col-5 nxt_days rounded-4 shadow-lg text-center text-white mt-3 hover"
    >
      <h4>${my_day}</h4>
      <h2>${my_com}</h2>
      <h3>
        <i class="fa-solid fa-temperature-three-quarters red"></i> ${my_max_temp}
        &#8451;
      </h3>
      <h3>
      <i class="fa-solid fa-temperature-quarter blue"></i> ${my_min_temp}
        &#8451;
      </h3>
    </div>
      `
      console.log(my_new_temp);
      let my_predict = document.querySelector(".my_predict")
      my_predict.innerHTML += my_new_temp
    }
  })
})
}