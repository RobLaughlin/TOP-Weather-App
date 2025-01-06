import { getTimeline } from "./WeatherApi";
import { createWeatherCard } from "../components/WeatherCard/WeatherCard";
import "../css/index.css";

const FORECAST_DAYS = 5;

function clearWeatherCards() {
    const weatherCards = document.querySelectorAll(
        ".weatherCardContainer > .weatherCard"
    );
    weatherCards.forEach((card) => {
        card.remove();
    });
}

function injectWeatherCards(cards) {
    const container = document.querySelector(".weatherCardContainer");
    cards.reverse().forEach((card) => {
        container.insertBefore(card, container.firstChild);
    });
}

async function weatherSearchBtnClicked(event) {
    const form = event.target.parentElement;
    const searchBar = form.querySelector("#WeatherSearchBar");
    const query = searchBar.value;

    try {
        if (query === "") {
            throw new Error("Search bar must be non-empty.");
        }

        // Create the new weather cards from timeline
        const timeline = await getTimeline(query, "us");
        const cards = timeline.days
            .slice(0, FORECAST_DAYS)
            .map(createWeatherCard)
            .map((card) => {
                return card.render("F");
            });

        clearWeatherCards();
        injectWeatherCards(cards);
    } catch (err) {
        console.log(err);
    }
}

let weatherSearchBtn = document.querySelector("#SearchForm > button");
weatherSearchBtn.addEventListener("click", weatherSearchBtnClicked);
