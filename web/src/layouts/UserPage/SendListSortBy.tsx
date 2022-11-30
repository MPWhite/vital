import styled from "styled-components";

const SendListSortDiv = styled.div`
  margin-top: 5pt x;
  text-align: right;
  margin-bottom: 5px;
`;

const SortByLabel = styled.span`
  margin-right: 5px;
  font-size: 12px;
`;

const SortBySelect = styled.select`
  background-color: black;
  border: none;
  color: white;
  font-size: 12px;
`;

export function SendListSortBy() {
  return (
    <SendListSortDiv>
      <SortByLabel>Sort By:</SortByLabel>
      <SortBySelect>
        <option>Recent</option>
        <option>Rating</option>
      </SortBySelect>
    </SendListSortDiv>
  );
}
