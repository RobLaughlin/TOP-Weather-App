import { getTimeline } from "./WeatherApi";

async function init() {
    const timeline = await getTimeline("new york city");
    console.log(timeline);
}

init();
