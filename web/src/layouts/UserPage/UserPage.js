// React UserPage
import React from "react";
import styled from "styled-components";
import { TabbedSection } from "./TabbedSection";

const UserPageWrapper = styled.div`
  background-color: black;
  padding: 10px;
`;

const Header = styled.div`
  padding: 5px;
`;

const ProfPic = styled.div`
  height: 100px;
  width: 100px;
  margin: 0 auto;
  position: relative;
  border: 2px solid orange;
  border-radius: 50%;

  img {
    height: 100px;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 50%;
  }

  :before {
    position: absolute;
    display: block;
    content: "";
    border: 5px solid black;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-radius: 50%;
  }
`;

const HeaderInfo = styled.div`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const NameSpan = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: #eee;
`;

const UserStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #222;
  color: white;
  padding: 10px;
  border-radius: 15px;
  width: 25%;
`;

const TitleSpan = styled.span`
  font-size: 12px;
  color: #777;
`;

const ValueSpan = styled.span`
  font-size: 24px;
  line-height: 40px;
  color: #eee;
  font-weight: bolder;
`;

export function UserPage() {
  return (
    <UserPageWrapper>
      <Header>
        <ProfPic>
          <img src="/sarah.png" alt="alt" />
        </ProfPic>
        <HeaderInfo>
          <NameSpan>Sarah Olijar</NameSpan>
          <UserStats>
            <Stat>
              <TitleSpan>MAX</TitleSpan>
              <ValueSpan>Red</ValueSpan>
            </Stat>
            <Stat>
              <TitleSpan>SENDS</TitleSpan>
              <ValueSpan>312</ValueSpan>
            </Stat>
            <Stat>
              <TitleSpan>RANK</TitleSpan>
              <ValueSpan>1</ValueSpan>
            </Stat>
          </UserStats>
        </HeaderInfo>
      </Header>
      <TabbedSection />
    </UserPageWrapper>
  );
}
