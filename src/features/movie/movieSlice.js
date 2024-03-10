import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommend: null,
  newDisney: null,
  original: null,
  trending: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.recommend = action.payload.recommend;
      state.newDisney = action.payload.newDisney;
      state.original = action.payload.original;
      state.trending = action.payload.trending;
    },
  },
});

export const { setMovies } = movieSlice.actions;

export const selectRecommend = (state) => state.movie.recommend;
export const selectNewDisney = (state) => state.movie.newDisney;
export const selectOriginal = (state) => state.movie.original;
export const selectTrending = (state) => state.movie.trending;

export default movieSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   newReleases: null,
//   recommend: null,
//   movies: null,
//   watchlist: null
// }

// const movieSlice = createSlice({
//   name: 'movie',
//   initialState,
//   reducers: {
//     setMovies: (state, action) => {
//       state.newReleases = action.payload.newReleases;
//       state.recommend = action.payload.recommend;
//       state.movies = action.payload.movies;
//       state.watchlist = action.payload.watchlist;
//     }
//   }
// });

// export const { setMovies } = movieSlice.actions;

// export const selectNewReleases = (state) => state.movie.selectNewReleases;
// export const selectRecommend = (state) => state.movie.selectRecommend;
// export const selectMovies = (state) => state.movie.selectMovies;
// export const selectWatchlist = (state) => state.movie.selectWatchlist;

// export default movieSlice.reducer;