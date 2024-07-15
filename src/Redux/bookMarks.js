import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// function to bookmark movies or tvSeries
export const bookmarksDetailsSendToDatabase = createAsyncThunk("bookmarksDetails", async (mediaDetails)=>{
    const {media_type,media_id}= mediaDetails.data
//  console.log(media_type,media_id,watchlist , "bookmarks Reducers")
    try {
            const options = {
              method: "POST",
              url: 'https://api.themoviedb.org/3/account/21026937/watchlist',
              params: { language: "en-US" },
              headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDA3MmZkYmY3ODkxMjUxYzM3MGVhNzk2ZTNjNjYyZiIsIm5iZiI6MTcyMDY5MTU3NC4yMDE1NjgsInN1YiI6IjY2OGZhOTEyOWNkZGU2M2I4M2I2MzE1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CXuLEFK_aYiPCLgS27OdIH-M3AXxZ6pSvk_whCSOovw"
              },
              data: {
                media_type, 
                media_id, 
                watchlist:true 
              }
            };
          const bookmarkMediaDetails = await axios(options)
          console.log(bookmarkMediaDetails , "reducer")
         return bookmarkMediaDetails.data;
          } catch (error) {
            console.log(error);
          }
  })
  // function to remove movies and tvSeries from database
  export const removeBookmarksDetailsSendToDatabase = createAsyncThunk("removeBookmarksDetails", async (mediaDetails)=>{
    const {media_type,media_id}= mediaDetails.data
//  console.log(media_type,media_id,watchlist , "bookmarks Reducers")
    try {
            const options = {
              method: "POST",
              url: 'https://api.themoviedb.org/3/account/21026937/watchlist',
              params: { language: "en-US" },
              headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmI3YmM0NjhlZDg0YmE2NGVjMTNlMzViZmUxMjI1ZiIsInN1YiI6IjY1ZDhjNmZjMTQ5NTY1MDE3YmY2N2Q5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wbUnxNfU9lOdqtQzy0lNL-8MR28pUG5TgVvHzefb60A'
              },
              data: {
                media_type, 
                media_id, 
                watchlist:false 
              }
            };
          const removeBookmarkMediaDetails = await axios(options)
          // console.log(removeBookmarkMediaDetails , "reducer")
         return removeBookmarkMediaDetails.data;
          } catch (error) {
            console.log(error);
          }
  })
const initialState = {
    bookmarkApiCallingResponse : {},
    removeMediaFromBookmarks : {},
    // get bookmarks tvseries  and movies 
    bookmarksDataTvseries : {},
    bookmarksDataMovies : {}
}
  const bookmarkSlice = createSlice({
    name : "bookmarkTvAndMovies",
    reducers : {
      bookmarksDetailsTvSeries : (state , action )=>{
        state.bookmarksDataTvseries = action.payload
      },
      bookmarksDetailsMovies : (state , action )=>{
        state.bookmarksDataMovies = action.payload
      }
    },
    initialState,
    // handle async function
        extraReducers: (builder)=>{
          builder.addCase(bookmarksDetailsSendToDatabase.fulfilled , (state, action )=>{
            state.bookmarkApiCallingResponse = action.payload
            state.loading = false
          }).addCase(bookmarksDetailsSendToDatabase.pending , (state )=>{
            state.loading = true
          }).addCase(bookmarksDetailsSendToDatabase.rejected , (state )=>{
            state.loading = false
          }).addCase(removeBookmarksDetailsSendToDatabase.fulfilled , (state ,action )=>{
            state.removeMediaFromBookmarks = action.payload
            state.loading = false
          }).addCase(removeBookmarksDetailsSendToDatabase.pending , (state )=>{
            state.loading = true
          }).addCase(removeBookmarksDetailsSendToDatabase.rejected , (state )=>{
            state.loading = false
          })
        }
})
export const {bookmarksDetailsMovies, bookmarksDetailsTvSeries} = bookmarkSlice.actions
export default bookmarkSlice.reducer
