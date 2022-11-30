import React from "react";
import "./BoulderPage.scss";
import { Link } from "react-router-dom";
import { ImageGallery } from "./ImageGallery";
import { Buttons } from "./Buttons";
import styled from "styled-components";

const BoulderPageDiv = styled.div`
  width: 100vw;
  background-color: black;
`;

const ContentDiv = styled.div`
  padding: 10px;
`;

const BoulderDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoulderTitle = styled.span`
  font-weight: bolder;
  font-size: 24px;
  color: #eee;
`;

const BoulderSubtitle = styled.span`
  font-size: 12px;
  color: #999;
`;

const PillContainer = styled.div`
  margin-top: 5px;
  padding-bottom: 10px;
  display: flex;
`;

const Pill = styled.div`
  background-color: #222;
  font-size: 14px;
  margin: 3px;
  padding: 2px 10px 2px 10px;
  border-radius: 10px;
  color: white;
`;

const Section = styled.div`
  border-top: #222 1px solid;
  padding: 15px 0 15px 0;
`;

const SectionTitle = styled.span`
  font-weight: bold;
  font-size: 18px;
  color: #eee;
`;

const FlexSubSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const StatSubSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: space-between;
`;

const SendPill = styled.div`
  background-color: #222;
  display: flex;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  margin: 5px;
  padding: 0 15px 0 0;
`;

const SendPillImage = styled.div`
  position: relative;
  height: 30px;
  width: 30px;
  border-radius: 50%;

  img {
    position: absolute;
    top: 2px;
    left: 2px;
    height: 26px;
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const SendPillName = styled.span`
  margin-left: 5px;
  color: white;
  font-size: 12px;
`;

const StatCard = styled.div`
  background-color: #222;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  text-align: center;
  width: 28%;
`;

const StatCardTitle = styled.span`
  font-size: 10px;
  color: #777;
`;

const StatCardValue = styled.span`
  font-size: 22px;
  font-weight: bold;
  padding: 10px;
  color: #eee;
`;

function StatCardComponent({ title, value }) {
  return (
    <StatCard>
      <StatCardTitle>{title}</StatCardTitle>
      <StatCardValue>{value}</StatCardValue>
    </StatCard>
  );
}

function SendPillComponent({ name, image }) {
  return (
    <Link to={`/user`}>
      <SendPill>
        <SendPillImage>
          <img src={image} alt="ALT" />
        </SendPillImage>
        <SendPillName>{name}</SendPillName>
      </SendPill>
    </Link>
  );
}

export function BoulderPage() {
  return (
    <BoulderPageDiv>
      <ImageGallery />
      <ContentDiv>
        <BoulderDescription>
          <BoulderTitle>Megatron (but harder)</BoulderTitle>
          <BoulderSubtitle>Named by: Matt</BoulderSubtitle>
          <PillContainer>
            <Pill>Crimps</Pill>
            <Pill>Heel hooks</Pill>
            <Pill>Dyno</Pill>
          </PillContainer>
        </BoulderDescription>
        {/*<Section>*/}
        {/*  <SectionTitle>Boulder Stats</SectionTitle>*/}
        {/*  <StatSubSection>*/}
        {/*    <StatCardComponent title="Completion" value="89%" />*/}
        {/*    <StatCardComponent title="Avg Attempts" value="13" />*/}
        {/*    <StatCardComponent title="Elo" value="1323.3" />*/}
        {/*  </StatSubSection>*/}
        {/*</Section>*/}
        <Section>
          <SectionTitle>Recorded Sends</SectionTitle>
          <FlexSubSection>
            <SendPillComponent name="Sarah Olijar" image="/sarah.png" />
            <SendPillComponent name="Trevor Frey" image="/trevor.jpg" />
            <SendPillComponent name="Matt White" image="/matt.jpg" />
            <SendPillComponent name="Aron Korenblit" image="/aron.jpg" />
          </FlexSubSection>
        </Section>
        <Section>
          <Buttons />
        </Section>
      </ContentDiv>
    </BoulderPageDiv>
  );
}
