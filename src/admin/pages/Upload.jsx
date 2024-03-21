import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import { FaArrowCircleLeft } from 'react-icons/fa';

const Upload = () => {
  return (
    <Layout>
        <Container>
            <Box>
                <Heading>Uploaded Content</Heading>
                <Popup trigger={<NewUpload>New Movie</NewUpload>} closeOnDocumentClick={false} closeOnEscape={false} modal nested>
                  {
                    close => (
                      <Modal>
                        <MenuBar>
                          <CloseBtn onClick={() => close()}>
                            <FaArrowCircleLeft />
                          </CloseBtn>
                          <Description>Upload a movie</Description>
                        </MenuBar>
                        <UploadForm>
                          <InputGroup>
                            <Label>Title</Label>
                            <Input type="text" placeholder='Eg: Raya' />
                          </InputGroup>
                          <InputGroup>
                            <Label>Sub Title</Label>
                            <Input type="text" placeholder='Eg: 2021 • 1h 52m • Family, Fantasy, Animation, Action-Adventure' />
                          </InputGroup>
                          <InputGroup>
                            <Label>Description</Label>
                            <Textarea placeholder="Eg: Watch with Premier Access at the same time it's in open theaters and before it's available to all Disney+ subscribers on June 4, 2021." />
                          </InputGroup>
                          <InputGroup>
                            <Label>Card Image</Label>
                            <FileInput type='file' accept='jpg/png' />
                          </InputGroup>
                          <InputGroup>
                            <Label>Background Image</Label>
                            <FileInput type='file' accept='jpg/png' />
                          </InputGroup>
                          <InputGroup>
                            <Label>Title Image</Label>
                            <FileInput type='file' accept='jpg/png' />
                          </InputGroup>
                          <InputGroup>
                            <Label>Select Category</Label>
                            <Select name="type">
                              <option value="movie">Movie</option>
                              <option value="series">Series</option>
                              <option value="sports">Sports</option>
                            </Select>
                          </InputGroup>
                          <SubmitButton type="submit">Upload</SubmitButton>
                        </UploadForm>
                      </Modal>
                    )
                  }
                </Popup>
            </Box>
        </Container>
    </Layout>
  )
}

const Container = styled.div`
  padding: 20px 60px;
  padding-left: 300px;
  height: 100vh;
  width: 100%;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h2`
  color: #090b13;
`;

const NewUpload = styled.button`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  font-size: 18px;
  padding: 10px 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0483ee;
  }
`;

const Modal = styled.div`
  width: 700px; 
  max-height: 80vh; /* Adjust as needed */
  overflow-y: auto; /* Enable vertical scroll */
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

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  outline: none;
  color: #f9f9f9;
  font-size: 22px;
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: #f9f9f9;
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

const Select = styled.select`
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
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

export default Upload;
