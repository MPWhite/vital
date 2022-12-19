import React from "react";
import "./BoulderPage.scss";
import { Link } from "react-router-dom";
import { ImageGallery } from "./ImageGallery";
import { Buttons } from "./Buttons";
import styled from "styled-components";
import { attemptBoulder, fetchBoulder } from "./bouldersApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { BoulderResponse } from "@backend/boulders.types";
import { Header } from "../../components/Header/Header";
import { SignUpCta } from "../../components/SignupCta";
import { useAuth } from "../../components/Auth/hooks";

const BoulderPageDiv = styled.div`
  width: 100vw;
  background-color: black;
  padding-top: 40px;
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

function StatCardComponent({ title, value }: { title: string; value: string }) {
  return (
    <StatCard>
      <StatCardTitle>{title}</StatCardTitle>
      <StatCardValue>{value}</StatCardValue>
    </StatCard>
  );
}

function SendPillComponent({
  userId,
  name,
  imageUrl,
}: {
  userId: string;
  name: string;
  imageUrl: string;
}) {
  return (
    <Link to={`/user/${userId}`}>
      <SendPill>
        <SendPillImage>
          <img src={imageUrl} alt="ALT" />
        </SendPillImage>
        <SendPillName>{name}</SendPillName>
      </SendPill>
    </Link>
  );
}

export function BoulderPage() {
  const { boulderId } = useParams<{ boulderId: string }>();
  const { isAuthenticated, user } = useAuth();
  const { data: boulder, status } = useQuery<BoulderResponse>(
    ["boulder", boulderId],
    () => fetchBoulder(boulderId || "1")
  );

  if (!boulder) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <BoulderPageDiv>
        <ImageGallery primaryPhotoUrl={boulder.primaryPhotoUrl} />
        <ContentDiv>
          <BoulderDescription>
            <BoulderTitle>{boulder.name}</BoulderTitle>
            <BoulderSubtitle>Named by: Matt</BoulderSubtitle>
            <PillContainer>
              {boulder.tags.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
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
              {boulder.sends.map((send) => (
                <SendPillComponent
                  key={send.userId}
                  userId={send.userId}
                  name={send.userName}
                  imageUrl={send.userProfilePicUrl}
                />
              ))}
            </FlexSubSection>
          </Section>
          <Section>
            {isAuthenticated ? (
              <Buttons
                boulderId={boulder.id}
                attempts={0}
                completed={boulder.sends.map((s) => s.userId).includes(user.id)}
              />
            ) : (
              <SignUpCta />
            )}
          </Section>
        </ContentDiv>
      </BoulderPageDiv>
    </>
  );
}
