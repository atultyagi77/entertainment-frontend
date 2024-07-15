import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home"
import Bookmark from "./Pages/Bookmark"
import Movies from "./Pages/Movies"
import Tvseries from "./Pages/Tvseries"
import Header from './components/Header';
import MovieSinglePage from './Pages/individualPages/singlePageForMovie/MovieSinglePage';
import TvSeriesSinglePage from './Pages/individualPages/singlePageTvSeries/TvSeriesSinglePage';
import Recommendation from './Pages/individualPages/singlePageRecommendation/Recommendation';
import Login from './Pages/loginSingupPages/Login';
import Signup from './Pages/loginSingupPages/Signup';
// import Logout from './Pages/loginSingupPages/Logout'
import PageNotFound from './Pages/PageNotFound';

function App() {
  console.clear()
  return (
    <>
      {/* Import Header */}
      <Header />
      <Routes>
        {/* route for index or home page */}
        <Route exact path="" element={<Home />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="signup" element={<Signup />} />
        {/* <Route exact path="logout" element={<Logout />} /> */}
        <Route path="bookmarks" element={<Bookmark />} />
        <Route path="movies" element={<Movies />} />
        <Route path="tvseries" element={<Tvseries />} />
        {/* route for individual movie page */}
        <Route path="movie/:original_title" element={<MovieSinglePage />} />
        <Route path="tvseries/:original_title" element={<TvSeriesSinglePage />} />
        <Route path="recommendation/:original_title" element={<Recommendation />} />
        {/* If route not found moves to page not found*/}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  );
}

export default App;
