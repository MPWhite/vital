import React, { useState } from "react";
import { Header } from "../../components/Header/Header";
import styled from "styled-components";
import { useAuth } from "../../components/Auth/hooks";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const UserSettingsDiv = styled.div`
  margin-top: 40px;
  padding: 10px;
  display: flex;
`;

const ProfilePicture = styled.div`
  position: relative;
  img {
    height: 250px;
    width: 250px;
    object-fit: cover;
  }
  svg {
    position: absolute;
    top: 5px;
    left: 5px;
    height: 20px;
  }
`;

const EditDisplayName = styled.div``;

const ProfileSettings = styled.div``;

export function UserSettings() {
  const { isAuthenticated, user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);

  // TODO -- we should link to Login page I think
  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  return (
    <>
      <Header />
      <UserSettingsDiv>
        <ProfileSettings>
          <ProfilePicture>
            <img src={user.profilePicUrl} alt="TODO" />
            {selectedImage && (
              <img
                alt="not fount"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
            )}
            <button onClick={() => setSelectedImage(null)}>Remove</button>
            <FontAwesomeIcon icon={faCamera} />
            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
          </ProfilePicture>
          <EditDisplayName />
        </ProfileSettings>
      </UserSettingsDiv>
    </>
  );
}
