import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
// REACT
import { useEffect, useState } from "react";
// MATERIAL UI COMPONENTS
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
// EXTERNAL LIBRARIES
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";

moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#fff",
    },
  },
});

let cancelAxios = null;
function App() {
  //==========STATES========//
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });
  const [locale, setLocale] = useState({
    lang: "ar",
    dir: "rtl",
  });
  const [cityName, setCityName] = useState("");
  const [cityLocation, setCityLocation] = useState({
    lat: 13.34,
    lon: 44.01,
    name: "Taiz",
  });

  // =======EVENT HANDLERS==========//
  function handleLangugeClick() {
    if (locale.lang == "en") {
      setLocale({ lang: "ar", dir: "rtl" });
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale({ lang: "en", dir: "ltr" });
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }
  function handleInputChange(e) {
    setCityName(e.target.value);
  }
  function handleButtonClick() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=36a5dc3fc6084d6064e829c3be88db6b`
      )
      .then((Response) => {
        const lat = Response.data.coord.lat;
        const lon = Response.data.coord.lon;
        setCityLocation({ lat, lon });
        setCityName("");
      })
      .catch((error) => {
        alert("المعذرة لم يتم العثور على هذه المدينة",error);
      });
  }
  useEffect(() => {
    i18n.changeLanguage("ar");
  }, []);
  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityLocation.lat}&lon=${cityLocation.lon}&appid=36a5dc3fc6084d6064e829c3be88db6b`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then((Response) => {
        const responseTemp = Math.round(Response.data.main.temp - 272.15);
        const min = Math.round(Response.data.main.temp_min - 272.15);
        const max = Math.round(Response.data.main.temp_max - 272.15);
        const description = Response.data.weather[0].description;
        const responseIcon = Response.data.weather[0].icon;
        setTemp({
          number: responseTemp,
          min: min,
          max: max,
          description: description,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });
      })
      .catch((error) => {
        console.log("Type Error: ", error.message);
      });
    return () => {
      cancelAxios();
    };
  }, [, cityLocation]);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* CARD CONTAINER */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}>
            {/* SEARCH FOR A CITY */}
            <div
              dir={locale.dir}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                flexDirection: "column",
                marginBottom: "49px",
              }}>
              {/* INPURT FIELD */}
              <TextField
                id="outlined-basic"
                label={t("City name")}
                variant="outlined"
                color="primary"
                value={cityName}
                onChange={handleInputChange}
              />
              {/*// INPURT FIELD //*/}
              {/* SEARCH BUTTON */}
              <Button
                color="primary"
                variant="outlined"
                style={{ marginTop: "10px" }}
                onClick={handleButtonClick}
                disabled={cityName.length ? false : true}>
                {t("Search")}
              </Button>
              {/*// SEARCH BUTTON //*/}
            </div>
            {/*// SEARCH FOR A CITY //*/}
            {/* CARD */}
            <div
              dir={locale.dir}
              style={{
                background: "rgb(28 52 91 /36%)",
                color: "white",
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "0px 11px 1px rgba(0, 0, 0, 0.1)",
              }}>
              {/* CONTENT  */}
              <div>
                {/* CITY & TIME */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "start",
                    }}
                    dir={locale.dir}>
                    <Typography variant="h3" style={{ marginRight: "20px" }}>
                      {t(cityLocation.name)
                        ? t(cityLocation.name)
                        : cityLocation.name}
                    </Typography>
                    <Typography variant="h6" style={{ marginRight: "20px" }}>
                      {dateAndTime}
                    </Typography>
                  </div>
                </div>
                {/*== CITY & TIME ===*/}

                <hr />
                {/* CONTAINER OF DEGREE + CLOUD ICON */}

                <div
                  style={{ display: "flex", justifyContent: "space-around" }}>
                  {/* DEGREE & DESCRIPTION */}

                  {/*=== CONTAINER OF DEGREE + CLOUD ICON ===*/}
                  <div>
                    {/* TEMP */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                      <Typography variant="h2" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>
                      {/*  WEATHER ICON */}
                      <img src={temp.icon} alt="weatherIcon" />
                      {/*===  WEATHER ICON ===*/}
                    </div>
                    {/*=== TEMP ===*/}
                    <div style={{ textAlign: "start" }}>
                      <Typography variant="h7">
                        {t(temp.description)}
                      </Typography>
                    </div>
                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      <h5>
                        {t("Min")}: {temp.min}
                      </h5>
                      <h5 style={{ margin: "0px 5px" }}> |</h5>
                      <h5>
                        {t("Max")}: {temp.max}
                      </h5>
                    </div>
                    {/*=== MIN & MAX ===*/}
                  </div>
                  {/*=== DEGREE & DESCRIPTION ===*/}
                  <CloudIcon style={{ fontSize: "150px", color: "white" }} />
                </div>
              </div>
              {/*=== CONTENT  ===*/}
            </div>
            {/*=== CARD ===*/}

            {/* TRANSLATION CONTAINER */}
            <div
              dir={locale.dir}
              style={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
                marginTop: "15px",
              }}>
              <Button
                style={{ color: "white" }}
                variant="text"
                onClick={handleLangugeClick}>
                {locale.lang == "en" ? "ARABIC" : "إنجليزي"}
              </Button>
            </div>
            {/*=== TRANSLATION CONTAINER ===*/}
          </div>
          {/*=== CARD CONTAINER ===*/}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
