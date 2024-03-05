// container element
var container = document.createElement("div");
container.className = "container";

// Creating the h1 element with id "title" and class "text-center"
var title = document.createElement("h1");
title.id = "title";
title.className = "text-center";
title.textContent = "Restcountry and Weather using fetch API";

// Creating the row div with class "row"
var row = document.createElement("div");
row.className = "row";

container.append(title);
container.append(row);
document.body.append(container);

fetch("https://restcountries.com/v3.1/all")
  .then((x) => x.json())
  .then((y) => {
    console.log(y);
    for (i = 0; i < y.length; i++) {
      // Create the card element
      const col = document.createElement("div");
      col.classList.add("m-2", "col-sm-6", "col-md-4", "col-lg-4", "col-xl-4");
      col.style.width = "18rem";

      const card = document.createElement("div");
      card.classList.add(
        "card",
        "h-100",
        "m-2",
        "col-sm-6",
        "col-md-4",
        "col-lg-4",
        "col-xl-4"
      );
      card.style.width = "18rem";

      // Create the card body
      const cardBody = document.createElement("div");
      cardBody.classList.add(
        "card-body",
        "d-flex",
        "flex-column",
        "justify-content-center",
        "align-items-center"
      );

      // Create the card header
      const cardHeader = document.createElement("div");
      cardHeader.classList.add("card-header", "w-100", "text-center");

      const title = document.createElement("h4");
      title.id = "country";
      title.textContent = y[i].name.common;

      cardHeader.append(title);

      // Create the flag image
      const flag = document.createElement("img");
      flag.id = "flag";
      flag.setAttribute("src", y[i].flags.png);
      flag.classList.add("card-img-top");
      flag.alt = "Flag";

      // Create the card text
      const cardText = document.createElement("div");
      cardText.classList.add("card-text");

      // Create paragraphs for information
      const capitalParagraph = document.createElement("p");
      capitalParagraph.innerHTML = `Capital: ${y[i].capital}`;

      const regionParagraph = document.createElement("p");
      regionParagraph.innerHTML = `Region: ${y[i].region}`;

      const countryCodeParagraph = document.createElement("p");
      countryCodeParagraph.innerHTML = `Country Code: ${y[i].cca3}`;

      // Append paragraphs to the card text
      cardText.append(capitalParagraph);
      cardText.append(regionParagraph);
      cardText.append(countryCodeParagraph);

      // Create the weather button
      const weatherButton = document.createElement("button");
      weatherButton.classList.add("btn", "btn-primary", "buttonstyle");
      weatherButton.textContent = "Click for Weather";

      weatherButton.onclick = (function (capital) {
        return function () {
          handleclick(capital);
          
        };
      })(y[i].capital);

      function handleclick(city) {
        
        const apiKey = "eb1c3a568d58f0c9854cfd72f5d5cc1c";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${apiKey}`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            let weatherReportdiv = card.querySelector("#weatherReportdivcss");
            if (weatherReportdiv) {
              card.removeChild(weatherReportdiv);
            } else {
              weatherReportdiv = document.createElement("div");
              weatherReportdiv.setAttribute("id", "weatherReportdivcss");

              let weatherReport = document.createElement("h4");
              weatherReport.classList.add("text-center");
              weatherReport.innerHTML = "Weather Report";
              weatherReportdiv.append(weatherReport);

              let temp = document.createElement("p");
              temp.classList.add("text-center");
              temp.innerHTML = `Temperature - ${Math.floor(
                data.main.temp - 272.15
              )} °C`;
              weatherReportdiv.append(temp);
              let desc = document.createElement("p");
              desc.classList.add("text-center");
              desc.innerHTML = `Feels like ${Math.floor(
                data.main.feels_like - 272.15
              )} °C , ${data.weather[0].description}`;
              weatherReportdiv.append(desc);

              let humidity = document.createElement("p");
              humidity.classList.add("text-center");
              humidity.innerHTML = `Humidity - ${data.main.humidity} %`;
              weatherReportdiv.append(humidity);
              let windspeed = document.createElement("p");
              windspeed.classList.add("text-center", "mb-3");
              windspeed.innerHTML = `windspeed - ${data.wind.speed} m/s N`;
              weatherReportdiv.append(windspeed);

              card.append(weatherReportdiv);
            }
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error.message);
          });
      }
      cardBody.append(cardHeader);
      cardBody.append(flag);
      cardBody.append(cardText);
      cardBody.append(weatherButton);
      card.append(cardBody);
      col.append(card);
      row.append(col);
    }
  });