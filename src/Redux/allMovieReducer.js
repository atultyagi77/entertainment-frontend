import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    details :null,
    data: null,
    all : null,
    recommendation : null,
    loading : false
}
// get movie details with async function using createAsyncThunk in redux toolkit
export const getMovieDetails = createAsyncThunk("details", async (movieId)=>{
  try {
          const options = {
            method: "GET",
            url: `https://api.themoviedb.org/3/movie/${movieId}`,
            params: { language: "en-US" },
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDA3MmZkYmY3ODkxMjUxYzM3MGVhNzk2ZTNjNjYyZiIsIm5iZiI6MTcyMDY5MTU3NC4yMDE1NjgsInN1YiI6IjY2OGZhOTEyOWNkZGU2M2I4M2I2MzE1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CXuLEFK_aYiPCLgS27OdIH-M3AXxZ6pSvk_whCSOovw",
            },
          };
        const moviedata = await axios(options)
        // console.log(moviedata)
       return moviedata.data
        // console.log(moviesData.data.results)
        } catch (error) {
          console.log(error);
        }
})
// get full details about movie or tvseries  async function using createAsyncThunk in redux toolkit

export const getMovieAndTvSeriesDetails = createAsyncThunk("tvAndSeriesdetails", async (movieId)=>{
  // get media type and media id from parameters
  try {
          const options = {
            method: "GET",
            url: `https://api.themoviedb.org/3/${movieId.type}/${movieId.id}`,
            params: { language: "en-US" },
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmI3YmM0NjhlZDg0YmE2NGVjMTNlMzViZmUxMjI1ZiIsInN1YiI6IjY1ZDhjNmZjMTQ5NTY1MDE3YmY2N2Q5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wbUnxNfU9lOdqtQzy0lNL-8MR28pUG5TgVvHzefb60A",
            },
          };
        const moviedata = await axios(options)
        // console.log(moviedata , "reducer")
         return moviedata.data
        // console.log(moviesData.data.results)
        } catch (error) {
          console.log(error);
        }
})

const movieDataSlice = createSlice({
    name : "moviesDetails",
    initialState,
    reducers : {
        // function to save movies data to initialState.details 
        setMovieData : (state,action) => {
            state.details = action.payload
        },
        // function to save recommedation movies and tvSeries in initialState.all
        getMoviesAndSeries : (state, action)=>{
          state.all = action.payload
        }
        },
        // handle async function if fulfilled save data to state.data or state.recommendation
        extraReducers: (builder)=>{
          builder.addCase(getMovieDetails.fulfilled , (state, action )=>{
            state.data = action.payload
            state.loading = false
          }).addCase(getMovieDetails.pending , (state )=>{
            state.loading = true
          }).addCase(getMovieDetails.rejected , (state )=>{
            state.loading = false

          }).addCase(getMovieAndTvSeriesDetails.fulfilled , (state, action )=>{
            state.recommendation = action.payload
            state.loading = false
          }).addCase(getMovieAndTvSeriesDetails.pending , (state )=>{
            state.loading = true
          }).addCase(getMovieAndTvSeriesDetails.rejected , (state )=>{
            state.loading = false
          })
        }
})

export const {setMovieData , getMoviesAndSeries  } = movieDataSlice.actions;
export default movieDataSlice.reducer

