import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import styled from 'styled-components';
import { db, storage } from '../../lib/firebase';
import Popup from 'reactjs-popup';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const UploadItem = ({ movie, style, setContent }) => {

  const [updateContentData, setUpdateContentData] = useState({
    title: movie.title,
    subTitle: movie.subTitle,
    description: movie.description,
    cardImg: movie.cardImg,
    backgroundImg: movie.backgroundImg,
    titleImg: movie.titleImg,
    movieURL: movie.movieURL
  });

  const [contentFileInput, setContentFileInput] = useState({
    cardImg: null,
    backgroundImg: null,
    titleImg: null
  });

  const handleContentDataChange = (event) => {
    setUpdateContentData(prevData => ({
      ...prevData,
      [event.target.name]: event.target.value
    }));
  };

  const handleFileChange = (event) => {
    setContentFileInput(prevData => ({
      ...prevData,
      [event.target.name]: event.target.files[0]
    }));
  };

  let uploadTasks = [];
  const updateContent = async (event) => {
    event.preventDefault();
    try {
      uploadTasks = Object.keys(contentFileInput).map(async (key) => {
        const file = contentFileInput[key];
        if(file) {
          const storageRef = ref(storage, `movies/${updateContentData.title}/${key}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          updateContentData[key] = downloadURL;
        }
      });

      await Promise.all(uploadTasks);

      const updatedDoc = {
        ...updateContentData
      }

      await updateDoc(doc(db, "movies", movie.id), updatedDoc);

      alert('Content Updated successfully!');

    } catch (err) {
      console.error("Error:", err);
    }
  }

  const deleteContent = async (id) => {
    const confirmation = confirm("Are you sure you want to delete this?");
    if(confirmation) {
      await deleteDoc(doc(db, "movies", id));
      // const storageRef =  ref(storage, `movies/${movie.title}`);
      // await deleteObject(storageRef);
      setContent(prevContent => prevContent.filter(item => item.id !== id));
    }
  }

  return (
    <Box style={{ border: `2px solid ${style === "white" ? "white" : "#090b13"}` }}>
        <Text style={{ color: `${style === "white" ? "white" : "#090b13"}` }}>{movie.title}</Text>
        <Text style={{ color: `${style === "white" ? "white" : "#090b13"}` }}>{movie.type}</Text>
        <Div>
          <Popup trigger={<ViewDetails>View Details</ViewDetails>} closeOnDocumentClick={false} closeOnEscape={false} modal nested>
            {
              close => (
                <Modal>
                  <MenuBar>
                    <CloseBtn onClick={() => {close();}}>
                      <FaArrowCircleLeft />
                    </CloseBtn>
                    <Description>Edit Meta Data</Description>
                  </MenuBar>
                  <UploadForm onSubmit={updateContent} method="post">
                    <InputGroup>
                        <Label>Title</Label>
                        <Input
                        name="title"
                        value={updateContentData.title}
                        onChange={handleContentDataChange}
                        type="text"
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>Sub Title</Label>
                        <Input
                        name="subTitle"
                        value={updateContentData.subTitle}
                        onChange={handleContentDataChange}
                        type="text"
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>Description</Label>
                        <Textarea
                        name="description"
                        onChange={handleContentDataChange}
                        value={updateContentData.description}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>Card Image</Label>
                        <FileInput
                        name="cardImg"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>Background Image</Label>
                        <FileInput
                        name="backgroundImg"
                        onChange={handleFileChange}
                        type="file"
                        accept="image/*"
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>Title Image</Label>
                        <FileInput
                        name="titleImg"
                        onChange={handleFileChange}
                        type="file"
                        accept="image/*"
                        />
                    </InputGroup>
                    <Delete onClick={() => close()}>Cancel</Delete>
                    <SubmitButton type="submit">Update Changes</SubmitButton>
                </UploadForm>
                </Modal>
              )
            }
          </Popup>
          <Delete onClick={() => deleteContent(movie.id)}>Delete</Delete>
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
  border: 2px solid #090b13;
  padding: 0 20px;
`;

const Div = styled.div`
  display: flex;
  gap: 10px;
`;

const ViewDetails = styled.button`
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
  color: #090b13;
  font-size: 16px;
`;

const Modal = styled.div`
  width: 700px; 
  max-height: 80vh;
  overflow-y: auto;
  background: url("/images/home-background.png") center center / cover;
  border-radius: 12px;
  border: 2px solid rgb(249, 249, 249);
  margin: auto;
  margin-top: 30px;
  padding: 10px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: auto;
    margin: auto 13px;
  }
`;

const MenuBar = styled.div`
  width: 100%;
  padding: 4px 12px;
  border-bottom: 2px solid #f9f9f9;
  display: flex;
  align-items: center;
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: #f9f9f9;
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  outline: none;
  color: rgb(249, 249, 249);
  font-size: 22px;
`;

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #f9f9f9;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const FileInput = styled.input`
  padding: 10px;
  border: none;
  outline: none;
`;

const SubmitButton = styled.button`
  background-color: #0063e5;
  color: #f9f9f9;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0483ee;
  }
`;

export default UploadItem;