import React, { useEffect } from 'react';
import styled from 'styled-components';
import ImgSlider from '../components/ImgSlider';
import Viewers from '../components/Viewers';
import Recommends from '../components/Recommends';
import Originals from '../components/Originals';
import NewDisney from '../components/NewDisney';
import Trending from '../components/Trending';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { setMovies } from '../features/movie/movieSlice';
import { selectUserName } from '../features/user/userSlice';

const Home = () => {

  const dispatch = useDispatch();
  const username = useSelector(selectUserName);
  let recommends = [];
  let newDisney = [];
  let originals = [];
  let trending = [];

  useEffect(() => {
    let unsubscribe = onSnapshot(query(collection(db, "movies")), (snapshot) => {
      snapshot.docs.map(doc => {
        switch(doc.data().type) {
          case 'recommend':
            recommends = [...recommends, {id: doc.id, ...doc.data()}];
            break;
          
          case 'new':
            newDisney = [...newDisney, {id: doc.id, ...doc.data()}];
            break;

          case 'original':
            originals = [...originals, {id: doc.id, ...doc.data()}];
            break;

          case 'trending':
            trending = [...trending, {id: doc.id, ...doc.data()}];
            break;
        }
      });

      dispatch(setMovies({
        recommend: recommends,
        newDisney: newDisney,
        original: originals,
        trending: trending
      }));

    });

    return unsubscribe;

  }, [username]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <Originals />
      <NewDisney />
      <Trending />
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