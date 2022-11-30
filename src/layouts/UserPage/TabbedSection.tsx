import React from "react";
import styled from "styled-components";
import { UserSendList } from "./UserSendList";

const TabbedWrapper = styled.div`
  border-top: #444 solid 1px;
  padding-top: 15px;
`;

const TabbedNav = styled.div`
  display: flex;
  justify-content: space-around;
`;

const TabbedNavItem = styled.div<any>`
  height: 10px;
  line-height: 10px;
  width: 40%;
  text-align: center;
  border: #444 solid 1px;
  padding: 10px;
  border-radius: 10px;
  color: white;
  background-color: ${(props) => (props.active ? "#1967fc" : "transparent")};
`;

const Tab = styled.div<any>`
  display: ${(props) => (props.active ? "block" : "none")};
  color: white;
  padding: 10px;
`;

enum TabTypes {
  SENDS = "sends",
  STATS = "stats",
}

export function TabbedSection() {
  const [activeTab, setActiveTab] = React.useState(TabTypes.SENDS);
  return (
    <TabbedWrapper>
      <TabbedNav>
        <TabbedNavItem
          active={activeTab === TabTypes.SENDS}
          onClick={() => setActiveTab(TabTypes.SENDS)}
        >
          Sends
        </TabbedNavItem>
        <TabbedNavItem
          active={activeTab === TabTypes.STATS}
          onClick={() => setActiveTab(TabTypes.STATS)}
        >
          Stats
        </TabbedNavItem>
      </TabbedNav>
      <Tab name="sends" active={activeTab === TabTypes.SENDS}>
        <UserSendList />
      </Tab>
      <Tab name="sends" active={activeTab === TabTypes.STATS}>
        TODO -- STATS
      </Tab>
    </TabbedWrapper>
  );
}
