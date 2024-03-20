import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';

const Upload = () => {
  return (
    <Layout>
        <Container>
            <Box>
                <Heading>
                    Uploaded Content
                </Heading>
                <NewUpload>
                    New
                </NewUpload>
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
    padding: 5px 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;

    &:hover {
    background-color: #0483ee;
    }
`;

export default Upload;