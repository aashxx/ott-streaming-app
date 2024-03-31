import React from 'react';
import Sidebar from './Sidebar';
import { styled } from 'styled-components';

const Layout = ({ children }) => {
  return (
    <>
    <Div>
        <Sidebar />
        <main>
            { children }
        </main>
    </Div>
    <Mobile>
      Not supported in mobile devices
    </Mobile>
    </>
  )
}

const Div = styled.div`
  background-color: white;
  width: 100%;

  @media screen and (max-width: 810px) {
    display: none;
  }
`;

const Mobile = styled.div`
  display: none;

  @media screen and (max-width: 810px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    color: white;
    font-weight: bold;
  }
`;

export default Layout;