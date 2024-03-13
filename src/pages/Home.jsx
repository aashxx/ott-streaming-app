import React, { useEffect } from 'react';
import styled from 'styled-components';
import ImgSlider from '../components/ImgSlider';
import Recommends from '../components/Recommends';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { setMovies } from '../features/movie/movieSlice';
import { selectUserName } from '../features/user/userSlice';
import WatchMovies from '../components/WatchMovies';
import WatchList from '../components/WatchList';
import NewReleases from '../components/NewReleases';

const Home = () => {

  const dispatch = useDispatch();
  const username = useSelector(selectUserName);
  let recommend = [];
  let newReleases = [];
  let watchMovies = [];
  let watchlist = [];

  useEffect(() => {

    let unsubscribe = onSnapshot(query(collection(db, "movies")), (snapshot) => {
      snapshot.docs.map(doc => {
        switch(doc.data().type) {
          case 'cartoon':
            recommend = [...recommend, {id: doc.id, ...doc.data()}];
            break;
          
          case 'sport':
            watchMovies = [...watchMovies, {id: doc.id, ...doc.data()}];
            break;

          case 'movie':
            newReleases = [...newReleases, {id: doc.id, ...doc.data()}];
            break;

          case 'series':
            watchlist = [...watchlist, {id: doc.id, ...doc.data()}];
            break;
        }
      });

      dispatch(setMovies({
        recommend: newReleases,
        newRelease: recommend,
        watchMovies: watchMovies,
        watchlist: watchlist
      }));

    });

    return unsubscribe;

  }, [username]);

  return (
    <Container>
      <ImgSlider />
      <NewReleases />
      <Recommends />
      <WatchMovies />
      <WatchList />
    </Container>
  )
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover;
    no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;