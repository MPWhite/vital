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
        <Section>
          <SectionTitle>Boulder Stats</SectionTitle>
          <StatSubSection>
            <StatCard>
              <StatCardTitle>Completion</StatCardTitle>
              <StatCardValue>89%</StatCardValue>
            </StatCard>
            <StatCard>
              <StatCardTitle>Avg Attempts</StatCardTitle>
              <StatCardValue>13</StatCardValue>
            </StatCard>
            <StatCard>
              <StatCardTitle>Elo</StatCardTitle>
              <StatCardValue>3124.2</StatCardValue>
            </StatCard>
          </StatSubSection>
        </Section>
        <Section>
          <SectionTitle>Recorded Sends</SectionTitle>
          <FlexSubSection>
            <Link to="/user">
              <SendPill>
                <SendPillImage>
                  <img src="/sarah.png" alt="tmp" />
                </SendPillImage>
                <SendPillName>Sarah Olijar</SendPillName>
              </SendPill>
            </Link>
            <Link to="/user">
              <SendPill>
                <SendPillImage>
                  <img src="/trevor.jpg" alt="tmp" />
                </SendPillImage>
                <SendPillName>Trevor Frey</SendPillName>
              </SendPill>
            </Link>
            <Link to="/user">
              <SendPill>
                <SendPillImage>
                  <img src="/matt.jpg" alt="tmp" />
                </SendPillImage>
                <SendPillName>Matt White</SendPillName>
              </SendPill>
            </Link>
            <Link to="/user">
              <SendPill>
                <SendPillImage>
                  <img src="/aron.jpg" alt="tmp" />
                </SendPillImage>
                <SendPillName>Aron Korenblit</SendPillName>
              </SendPill>
            </Link>
          </FlexSubSection>
        </Section>
        <Section>
          <Buttons />
        </Section>
      </ContentDiv>
    </BoulderPageDiv>
  );
}
