import { getTimeline } from "./WeatherApi";
import "../css/index.css";

async function weatherSearchBtnClicked(event) {
    const form = event.target.parentElement;
    const searchBar = form.querySelector("#WeatherSearchBar");
    const query = searchBar.value;

    try {
        if (query === "") {
            throw new Error("Search bar must be non-empty.");
        }

        const timeline = await getTimeline(query);
        console.log(timeline);
    } catch (err) {
        console.log(err);
    }
}

let weatherSearchBtn = document.querySelector("#SearchForm > button");
weatherSearchBtn.addEventListener("click", weatherSearchBtnClicked);
