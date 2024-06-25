import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./mainSlice";
import educationSlice from "./educationSlice";
import skillReducer from "./skillSlice";
import interestSlice from "./interestSlice";
import experienceReducer from "./experienceSlice";
import projectReducer from "./projectsSlice";
import summaryReducer from "./summrySlice";
import additionalSlice from "./additionalSlice";
import printedReducer from "./tabSlice";
import  tabCounter  from "./tabCounterSlice";

export const store = configureStore({
    reducer: {
        main: mainReducer,
        education: educationSlice,
        skill: skillReducer,
        interest: interestSlice,
        experience: experienceReducer,
        projects: projectReducer,
        summary: summaryReducer,
        additional: additionalSlice,
        printedStatus: printedReducer,
        tabCounter: tabCounter,

    }
})