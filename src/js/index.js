import { getTimeline } from "./WeatherApi";
import "../css/index.css";

async function weatherSearchBtnClicked(event) {
    const form = event.target.parentElement;
    const searchBar = form.querySelector("#WeatherSearchBar");
    const query = searchBar.value;

    if (query === "") {
        alert("Search bar must be non-empty.");
        return;
    }

    try {
        const timeline = await getTimeline(query);
        console.log(timeline);
    } catch (err) {
        console.log(err);
    }
}

let weatherSearchBtn = document.querySelector("#SearchForm > button");
weatherSearchBtn.addEventListener("click", weatherSearchBtnClicked);
