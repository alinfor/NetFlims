import _, { clone } from "lodash";

const initialState = [];

export const reducerSeries = (state = initialState, action) => {
    const cloneState = _.cloneDeep(state);
    switch (action.type) {
        case "INIT_SERIES":
            return action.series;
        case "FETCH_SERIES_SCROLL":
            let ids = [];
            for (let series of cloneState) {
                ids.push(series.id);
            }
        
            action.series.map((item) => {
                if (!ids.includes(item.id)) {
                cloneState.push(item);
                }
            });
            return cloneState;
        default:
            return state;
    }
}