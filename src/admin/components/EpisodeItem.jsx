import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import styled from 'styled-components';
import { db } from '../../lib/firebase';

const EpisodeItem = ({ movieId, episode, setEpisodes }) => {

  // Delete episode - From ARRAY and DB 
  const deleteContent = async (id) => {
    const confirmation = confirm("Are you sure you want to delete this?");
    if(confirmation) {
      await deleteDoc(doc(db, "movies", movieId, "episodes", id));
      // const storageRef =  ref(storage, `movies/${movie.title}`);
      // await deleteObject(storageRef);
      setEpisodes(prevContent => prevContent.filter(item => item.id !== id));
    }
  }
  
  return (
    <Box>
        <Text>{episode.title}</Text>
        <Text>{episode.type}</Text>
        <Div>
          <Delete onClick={() => deleteContent(episode.id)}>Delete</Delete>
        </Div>
    </Box>
  )
}

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border: 2px solid white;
  padding: 0 20px;
`;

const Div = styled.div`
  display: flex;
  gap: 10px;
`;

const Delete = styled.button`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #d11a2a;
  font-size: 14px;
  padding: 7px 15px;
  border: 1px solid transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Text = styled.h2`
  color: white;
  font-size: 16px;
`;

export default EpisodeItem;