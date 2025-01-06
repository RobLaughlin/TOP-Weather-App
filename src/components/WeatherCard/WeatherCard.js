import "./WeatherCard.css";
import sanitizeHtml from "sanitize-html";

const VALID_KEYS = [
    "description",
    "datetime",
    "conditions",
    "icon",
    "temp",
    "tempmax",
    "tempmin",
];

const DAY_NAMES = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export const createWeatherCard = (day) => {
    // Sanitize key values and replace undefined key values with "?"
    VALID_KEYS.forEach((key) => {
        day[key] = key in day ? sanitizeHtml(day[key]) : "?";
    });

    function render(degreeUnit = "C") {
        const icon = require(`../../images/${day.icon}.svg`);
        const tempmax = `High: ${day.tempmax}°${degreeUnit}`;
        const currentTemp = `Current: ${day.temp}°${degreeUnit}`;
        const tempmin = `Low: ${day.tempmin}°${degreeUnit}`;

        let dateDay = day.datetime;
        if (dateDay !== "?") {
            dateDay = new Date(dateDay).getDay();
            dateDay = DAY_NAMES[dateDay];
        }

        const html = /*html*/ `
            <div class="weatherCard">
                <span class="description">${day.description}</span>
                <img class="icon" src="${icon}" alt="${day.icon}">
                <div class="tempContainer">
                    <span class="high">${tempmax}</span>
                    <span class="current">${currentTemp}</span>
                    <span class="low">${tempmin}</span>
                </div>
                <div class="conditionsContainer">
                    <span class="date">${dateDay}</span>
                    <span class="conditions">${day.conditions}</span>
                </div>
            </div>
        `;

        const template = document.createElement("template");
        template.innerHTML = html;
        return template.content.firstElementChild;
    }

    return {
        render,
    };
};
