import { getTimeline } from "./WeatherApi";

async function init() {
    try {
        const timeline = await getTimeline("new york city");
        console.log(timeline);
    } catch (err) {
        console.log(err);
    }
}

init();
