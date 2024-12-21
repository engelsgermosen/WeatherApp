const api_key = "8362892ba71ba7af1b2947f918845c86";
const ciudad = document.querySelector("#input-city");
const span_city = document.querySelector("#span-city");
const temperatura = document.querySelector("#span-temp");
const sensacion = document.querySelector("#span-sensacion");
const temp_max = document.querySelector("#span-temp-max");
const temp_min = document.querySelector("#span-temp-min");
const humedad = document.querySelector("#span-humedad");
const formulario = document.querySelector(".formulario");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  buscarData();
});

ciudad.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (ciudad.value !== "") {
      e.preventDefault();
      buscarData();
    }
  }
});

async function buscarData() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad.value}&appid=${api_key}&units=metric&lang=es`
    );
    if (res.status === 404) {
      ciudad.value = "";
      temperatura.innerHTML = `N/A`;
      sensacion.innerHTML = `N/A`;
      temp_max.innerHTML = `N/A`;
      temp_min.innerHTML = `N/A`;
      humedad.innerHTML = `N/A`;
      span_city.textContent = "N/A";

      const notFount = document.createElement("p");
      notFount.textContent = "No se encontró la ciudad";
      notFount.style.color = "#5a0000";
      notFount.style.fontWeight = "bold";
      notFount.style.textAlign = "center";
      notFount.style.marginTop = "2rem";
      notFount.style.fontSize = "1.25rem";
      formulario.appendChild(notFount);

      setTimeout(() => {
        notFount.remove();
      }, 4000);
    } else if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      const clima = data.main;
      span_city.textContent = `${data.name}, ${data.sys.country}`;
      temperatura.textContent = `${Math.round(clima.temp)}°C`;
      sensacion.textContent = `${Math.round(clima.feels_like)}°C`;
      temp_max.textContent = `${Math.round(clima.temp_max)}°C`;
      temp_min.textContent = `${Math.round(clima.temp_min)}°C`;
      humedad.textContent = `${Math.round(clima.humidity)}%`;
      ciudad.value = "";
    }
  } catch (error) {
    DivError();
    console.log(error);
  }
}

function DivCiudadNoExiste() {
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.top = "20px";
  div.style.right = "20px";
  div.textContent = "No existe una ciudad con ese nombre";
  div.style.fontSize = "1.25rem";
  div.style.padding = "1.5rem";
  div.style.backgroundColor = "red";
  div.style.color = "#fff";
  div.style.borderRadius = "0.75rem";

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 4000);
}

function DivError() {
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.top = "20px";
  div.style.right = "20px";
  div.textContent = "ERROR";
  div.style.fontWeight = "900";
  div.style.fontSize = "1.25rem";
  div.style.padding = "1.5rem";
  div.style.backgroundColor = "red";
  div.style.color = "#fff";
  div.style.borderRadius = "0.75rem";

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 4000);
}
