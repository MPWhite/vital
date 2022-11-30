import React from "react";
import styled from "styled-components";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

const SEND_ITEM_HEIGHT = 50;

const SendItem = styled.div`
  background-color: #222;
  height: ${SEND_ITEM_HEIGHT}px;
  margin-top: 10px;
  display: flex;
`;

const SendRating = styled.div<any>`
  width: 3px;
  background-color: ${(props) => props.rating};
`;

const SendItemTitle = styled.span`
  font-weight: bold;
  font-size: 14px;
  color: #eee;
  line-height: ${SEND_ITEM_HEIGHT}px;
  margin-left: 10px;
`;

const SendItemDate = styled.span`
  font-size: 12px;
  line-height: ${SEND_ITEM_HEIGHT}px;
  color: #777;
  margin-left: auto;
  margin-right: 10px;
`;

// random time in the last week
function randomDate() {
  return new Date(
    new Date().getTime() - Math.random() * 1000 * 60 * 60 * 24 * 4
  ).toISOString();
}

const data: Array<{ boulderName: string; rating: string; time: string }> = [
  { boulderName: "Off The Wagon", rating: "orange", time: randomDate() },
  { boulderName: "Megatron", rating: "yellow", time: randomDate() },
  { boulderName: "Alphane", rating: "red", time: randomDate() },
  { boulderName: "Silence", rating: "orange", time: randomDate() },
  { boulderName: "Midnight Lightning", rating: "orange", time: randomDate() },
  { boulderName: "Burden of Dreams", rating: "red", time: randomDate() },
  { boulderName: "Rainbow Rocket", rating: "purple", time: randomDate() },
  { boulderName: "The Thimble", rating: "orange", time: randomDate() },
  { boulderName: "La Dura Dura", rating: "yellow", time: randomDate() },
  { boulderName: "DNA", rating: "orange", time: randomDate() },
  {
    boulderName: "Sleepwalker (Sit start)",
    rating: "orange",
    time: randomDate(),
  },
];

// Sort by time
data.sort((a, b) => {
  return new Date(b.time).getTime() - new Date(a.time).getTime();
});

function SendListItem({
  boulderNane,
  rating,
  time,
}: {
  boulderNane: string;
  rating: string;
  time: string;
}) {
  return (
    <SendItem>
      <SendRating rating={rating} />
      <SendItemTitle>{boulderNane}</SendItemTitle>
      <SendItemDate>{timeAgo.format(Date.parse(time))}</SendItemDate>
    </SendItem>
  );
}

export function UserSendList() {
  return (
    <>
      <>
        {data.map((item) => {
          return (
            <SendListItem
              boulderNane={item.boulderName}
              rating={item.rating}
              time={item.time}
            />
          );
        })}
      </>
    </>
  );
}
