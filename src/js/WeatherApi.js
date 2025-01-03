const TIMELINE_API =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const API_KEY = "5P9P58FBGZULG8LW4QL69DPCJ";
const CONTENT_TYPE = "json";

function buildQuery(location, unitGroup = "metric") {
    location = encodeURIComponent(location);
    const params = new URLSearchParams({
        unitGroup: unitGroup,
        key: API_KEY,
        contentType: CONTENT_TYPE,
    });

    return `${TIMELINE_API}/${location}?${params.toString()}`;
}

export const getTimeline = async (location, unitGroup = "metric") => {
    const query = buildQuery(location, unitGroup);

    const headers = {
        "Content-Type": "application/json",
    };
    const config = { headers };

    const response = await fetch(query, config);
    const result = await response.json();
    return result;
};
