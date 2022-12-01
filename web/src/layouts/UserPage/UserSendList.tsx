import React from "react";
import styled from "styled-components";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { SendListSortBy } from "./SendListSortBy";
import { Link } from "react-router-dom";
import { useQuery, useHydrate } from "@tanstack/react-query";
import { fetchUser } from "./userApi";
import { UserResponse } from "@backend/users.types";

TimeAgo.addDefaultLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

const SEND_ITEM_HEIGHT = 50;

const SendItem = styled.div`
  height: ${SEND_ITEM_HEIGHT}px;
  display: flex;
  border-top: 1px solid #222;
  padding: 5px 5px 5px 0;

  &:last-child {
    border-bottom: 1px solid #222;
  }
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

const FlashChip = styled.span`
  font-size: 10px;
  line-height: 15px;
  background: #fc00ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #00dbde,
    #fc00ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #00dbde,
    #fc00ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  color: white;
  height: 15px;
  padding: 3px 10px;
  border-radius: 50px;
  transform: translate(10px, 15px);
  svg {
    margin-right: 3px;
  }
`;

function SendListItem({
  boulderNane,
  rating,
  time,
  attempts,
}: {
  boulderNane: string;
  rating: string;
  time: string;
  attempts: number;
}) {
  return (
    <SendItem>
      <SendRating rating={rating} />
      <SendItemTitle>{boulderNane}</SendItemTitle>
      {attempts === 0 && (
        <FlashChip>
          <FontAwesomeIcon icon={faBolt} />
          Flash
        </FlashChip>
      )}
      <SendItemDate>{timeAgo.format(Date.parse(time))}</SendItemDate>
    </SendItem>
  );
}

export function UserSendList({ userId }: { userId: string }) {
  const { data: userInfo, status } = useQuery<UserResponse>(
    ["user", userId],
    () => fetchUser(userId)
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <SendListSortBy />
      {userInfo.completedBoulderDescriptions.map((boulderDesc) => {
        return (
          <Link to={`/boulder/${boulderDesc.id}`}>
            <SendListItem
              boulderNane={boulderDesc.name}
              rating={boulderDesc.rating}
              time={boulderDesc.completionTime.toString()}
              attempts={boulderDesc.attempts}
            />
          </Link>
        );
      })}
    </>
  );
}
