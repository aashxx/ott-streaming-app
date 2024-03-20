import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectUserName, selectUserPhoto, setSignOutState, setUserLoginDetails } from '../../features/user/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';

const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    const handleSignOut = async () => {
        if(username) {
        auth.signOut().then(() => {
            dispatch(setSignOutState());
            navigate('/');
        }).catch((err) => console.error(err.message));
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
        if(user) {
            setUser(user);
        }
        });
    }, [username]);

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                id: user.uid,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            })
        );
    }

    return (
        <Nav>
            <Logo>
                <img src="/images/tribesflix.png" alt="Disney+" />
            </Logo>
            <SignOut>
                <UserImg src={userPhoto} alt={username}  />
                <DropDown>
                    <span onClick={handleSignOut}>Sign Out</span>
                </DropDown>
            </SignOut>
            <NavMenu>
                <Link to="/admin/dashboard">
                    <span>DASHBOARD</span>
                </Link>
                <Link to={"/admin/upload"}>
                    <span>UPLOADS</span>
                </Link>
                <Link to={"/admin/users"}>
                    <span>USERS</span>
                </Link>
                <Link to={"/admin/content"}>
                    <span>SUBSCRIPTIONS</span>
                </Link>
                <Link to={"/admin/settings"}>
                <span>SETTINGS</span>
                </Link>
        </NavMenu>
        </Nav>
    )
}

const Nav = styled.nav`
  width: 250px;
  height: 100vh;
  background-color: #090b13;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 15px;
`;

const Logo = styled.a`
  padding: 0;
  width: 150px;
  margin-top: 4px;
  max-height: 100px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 40px;
  height: 100%;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  position: relative;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    justify-content: center;
    gap: 5px;

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    margin: 50px 0;
    height: auto;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-top: 100px;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Sidebar;