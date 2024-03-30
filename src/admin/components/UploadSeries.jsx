import React, { useState } from "react";
import styled from "styled-components";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../lib/firebase";
import EpisodeItem from "./EpisodeItem";

const UploadSeries = () => {

    const [episodes, setEpisodes] = useState([]);

    const [contentUploadData, setContentUploadData] = useState({
        title: '',
        subTitle: '',
        description: '',
        type: 'series',
    });

    const [contentFileInput, setContentFileInput] = useState({
        cardImg: null,
        backgroundImg: null,
        titleImg: null
    });

    const handleInputChange = (e) => {
        setContentUploadData({
        ...contentUploadData,
        [e.target.name]: e.target.value,
        });
    };

    const handleFileInputChange = (e) => {
        setContentFileInput({
        ...contentFileInput,
        [e.target.name]: e.target.files[0],
        });
    };

    const [episodeNumber, setEpisodeNumber] = useState('');
    const [episodeFile, setEpisodeFile] = useState(null);

    const handleUpload = async (event) => {
        event.preventDefault();
        try {
        const uploadTasks = Object.keys(contentFileInput).map(async (key) => {
            const file = contentFileInput[key];
            if(file) {
                const storageRef = ref(storage, `movies/${contentUploadData.title}/${key}`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                contentUploadData[key] = downloadURL;
            }
        });

        await Promise.all(uploadTasks);

        const docData = {
            ...contentUploadData,
            releaseDate: serverTimestamp()
        }

        const docRef = await addDoc(collection(db, 'movies'), docData);
        
        await Promise.all(episodes.map(async (episode) => {
            episode.cardImg = contentUploadData.cardImg;
            episode.backgroundImg = contentUploadData.backgroundImg;
            episode.titleImg = contentUploadData.titleImg;
            await addDoc(collection(docRef, 'episodes'), episode);
        }));

        console.log(episodes);

        alert('Form submitted successfully! Document ID: ' + docRef.id);

        setContentUploadData({
            title: '',
            subTitle: '',
            description: '',
            type: 'series',
        });
        
        setContentFileInput({
            cardImg: null,
            backgroundImg: null,
            titleImg: null
        });

        } catch (error) {
        console.error('Error submitting form:', error);
        }
    };

    const handleAddEpisode = async (event) => {
        event.preventDefault();
        try {
            if (episodeFile) {
                const storageRef = ref(storage, `movies/${contentUploadData.title}/episodes/${episodeNumber}.mp4`);
                await uploadBytes(storageRef, episodeFile);
                const episodeDownloadURL = await getDownloadURL(storageRef);
            
                const updatedEpisodeUploadData = {
                    episodeNumber: episodeNumber,
                    title: `EP${episodeNumber}: ${contentUploadData.title}`,
                    subTitle: contentUploadData.subTitle,
                    description: contentUploadData.description,
                    cardImg: contentUploadData.cardImg,
                    backgroundImg: contentUploadData.backgroundImg,
                    titleImg: contentUploadData.titleImg,
                    episodeURL: episodeDownloadURL
                };
        
                setEpisodes(prevEpisodes => [...prevEpisodes, updatedEpisodeUploadData]);
            }
        } catch (err) {
            console.error("Error", err);
        }
    };

    return (
        <UploadForm onSubmit={handleUpload} method="post">
        <InputGroup>
            <Label>Title</Label>
            <Input
            name="title"
            onChange={handleInputChange}
            value={contentUploadData.title}
            type="text"
            placeholder="Eg: Raya"
            required
            />
        </InputGroup>
        <InputGroup>
            <Label>Sub Title</Label>
            <Input
            name="subTitle"
            onChange={handleInputChange}
            value={contentUploadData.subTitle}
            type="text"
            placeholder="Eg: 2021 • 1h 52m • Family, Fantasy, Animation, Action-Adventure"
            required
            />
        </InputGroup>
        <InputGroup>
            <Label>Description</Label>
            <Textarea
            name="description"
            onChange={handleInputChange}
            value={contentUploadData.description}
            placeholder="Eg: Watch with Premier Access at the same time it's in open theaters and before it's available to all Disney+ subscribers on June 4, 2021."
            required
            />
        </InputGroup>
        <InputGroup>
            <Label>Card Image</Label>
            <FileInput
            name="cardImg"
            onChange={handleFileInputChange}
            type="file"
            accept="image/*"
            required
            />
        </InputGroup>
        <InputGroup>
            <Label>Background Image</Label>
            <FileInput
            name="backgroundImg"
            onChange={handleFileInputChange}
            type="file"
            accept="image/*"
            required
            />
        </InputGroup>
        <InputGroup>
            <Label>Title Image</Label>
            <FileInput
            name="titleImg"
            onChange={handleFileInputChange}
            type="file"
            accept="image/*"
            required
            />
        </InputGroup>
        {
            episodes.map((episode,i) => (
                <EpisodeItem movie={episode} key={i} style={"white"} />
            ))
        }
        <Box>
            <Heading>Add Episodes</Heading>
            <InputGroup>
            <Label>Episode No.</Label>
            <Input
                name="episodeNumber"
                onChange={(e) => setEpisodeNumber(e.target.value)}
                value={episodeNumber}
                type="text"
                placeholder="Eg: 1"
                required
            />
            </InputGroup>
            <InputGroup>
            <Label>Upload Episode</Label>
            <FileInput
                name="episodeFiles"
                onChange={(e) => setEpisodeFile(e.target.files[0])}
                type="file"
                accept="video/*"
                required
            />
            </InputGroup>
            <SubmitButton onClick={handleAddEpisode}>Add Episode</SubmitButton>
        </Box>
        <SubmitButton type="submit">Upload Series</SubmitButton>
        </UploadForm>
    );
};

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

const Box = styled.div`
  padding: 20px 30px;
  border: 2px solid white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Heading = styled.h3`
  color: white;
  font-size: 20px;
  text-align: center;
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

export default UploadSeries;
