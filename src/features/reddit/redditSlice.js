import { createSlice } from "@reduxjs/toolkit";

const urlBase = 'https://www.reddit.com/';

export const redditSlice = createSlice({
    name: 'redditSlice',
    initialState: {
        subreddits: {
            'r/cats': {
                name: 'r/cats',
                access: `${urlBase}r/cats.json`,
                isSelected: true
            },
            'r/IllegallySmolCats': {
                name: 'r/IllegallySmolCats',
                access: `${urlBase}r/IllegallySmolCats.json`,
                isSelected: true
            },
            'r/Catswhoyell': {
                name: 'r/Catswhoyell',
                access: `${urlBase}r/Catswhoyell.json`,
                isSelected: true
            },
            'r/ActivationSound': {
                name: 'r/ActivationSound',
                access: `${urlBase}r/ActivationSound.json`,
                isSelected: true,
            },
            'r/CatSlaps': {
                name: 'r/CatSlaps',
                access: `${urlBase}r/CatSlaps.json`,
                isSelected: true
            },
            'r/CatTaps': {
                name: 'r/CatTaps',
                access: `${urlBase}r/CatTaps.json`,
                isSelected: true
            },
            'r/catsinboxes': {
                name: 'r/catsinboxes',
                access: `${urlBase}r/catsinboxes.json`,
                isSelected: true,
            },
            'r/Thisismylifemeow': {
                name: 'r/Thisismylifemeow',
                access: `${urlBase}r/Thisismylifemeow.json`,
                isSelected: true
            },
            'r/scrungycats': {
                name: 'r/scrungycats',
                access: `${urlBase}r/scrungycats.json`,
                isSelected: true,
            },
            'r/notmycat': {
                name: 'r/notmycat',
                access: `${urlBase}r/notmycat.json`,
                isSelected: true,
            },
            'r/StartledCats': {
                name: 'r/StartledCats',
                access: `${urlBase}r/StartledCats.json`,
                isSelected: true
            }
        },
    },
    reducers: {
        updateSubVisibility(state,action) {
            // reads state of buttons in Sidebar component to determine whether each is active
            // connects with post rendering, filtering out posts belonging to inactive subreddits
        }
    },
    extraReducers: {},
});

export default redditSlice.reducer;
export const selectAllSubs = state => state.subreddits;
export const { updateSubVisibility } = redditSlice.actions;