import React from 'react';
import styled from 'styled-components';

const UploadItem = ({ movie }) => {
  return (
    <Box>
        <Text>{movie.title}</Text>
        <Text>{movie.type}</Text>
        <NewUpload>View Details</NewUpload>
    </Box>
  )
}

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border: 2px solid #090b13;
  padding: 0 20px;
`;

const NewUpload = styled.button`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  font-size: 14px;
  padding: 7px 15px;
  border: 1px solid transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #0483ee;
  }
`;

const Text = styled.h2`
  color: #090b13;
  font-size: 16px;
`;

export default UploadItem;