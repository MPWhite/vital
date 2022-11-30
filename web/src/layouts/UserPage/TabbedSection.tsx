import React from "react";
import styled from "styled-components";
import { UserSendList } from "./UserSendList";

const TabbedWrapper = styled.div`
  border-top: #444 solid 1px;
  padding: 5px;
`;

const TabbedNav = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  background-color: #222;
  border-radius: 20px;
  padding: 5px;
`;

const TabbedNavItem = styled.div<any>`
  line-height: 10px;
  width: 50%;
  text-align: center;
  padding: 10px;
  color: white;
  font-size: 14px;
  z-index: 100;
  cursor: pointer;
`;

const TabbedNavActiveChip = styled.div<any>`
  position: absolute;
  left: ${(props: any) => props.left};
  top: 5px;
  width: 50%;
  height: 30px;
  background-color: #3b6df8;
  z-index: 50;
  border-radius: 15px;
  transition-property: left;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.3, 0, 0.1, 1);
`;

const Tab = styled.div<any>`
  display: ${(props) => (props.active ? "block" : "none")};
  color: white;
`;

enum TabTypes {
  SENDS = "sends",
  STATS = "stats",
}

export function TabbedSection({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = React.useState(TabTypes.SENDS);
  return (
    <TabbedWrapper>
      <TabbedNav>
        <TabbedNavActiveChip
          left={activeTab === TabTypes.SENDS ? "5px" : "calc(50% - 5px)"}
        />
        <TabbedNavItem onClick={() => setActiveTab(TabTypes.SENDS)}>
          Sends
        </TabbedNavItem>
        <TabbedNavItem onClick={() => setActiveTab(TabTypes.STATS)}>
          Stats
        </TabbedNavItem>
      </TabbedNav>
      <Tab name="sends" active={activeTab === TabTypes.SENDS}>
        <UserSendList userId={userId} />
      </Tab>
      <Tab name="sends" active={activeTab === TabTypes.STATS}></Tab>
    </TabbedWrapper>
  );
}
