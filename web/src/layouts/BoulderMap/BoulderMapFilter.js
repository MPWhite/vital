import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const ExpandedFilterDiv = styled.div`
  position: fixed;
  background-color: #222;
  transition-property: bottom;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  bottom: ${(props) => (props.expanded ? "0" : "calc(-100% + 60px)")};
  z-index: 0;
  padding: 20px;
`;

const ExpandedFilterTitle = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: #eee;
`;

const FilterSection = styled.div`
  border-top: #333 1px solid;
  margin-top: 10px;
  padding-top: 10px;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 10px;
`;

const FilterSectionTitle = styled.span`
  font-size: 18px;
  color: #eee;
`;

const RatingPill = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
  height: 30px;
  padding: 4px 15px;
  border-radius: 20px;
  margin-right: 5px;
  background-color: ${(props) => (props.selected ? "#444" : "#222")};
  span {
    color: ${(props) => (props.selected ? "white" : "white")};
    line-height: 30px;
    margin-left: 24px;
    font-size: 14px;
  }
`;

const RatingChip = styled.div`
  height: 30px;
  width: 30px;
  position: absolute;
  top: 4px;
  left: 4px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

function RatingPillComponent({ color, selected, onClick }) {
  return (
    <RatingPill selected={selected} onClick={onClick}>
      <RatingChip color={color} />
      <span>{color}</span>
    </RatingPill>
  );
}

const LocationPill = styled.div`
  height: 30px;
  //border: 1px solid #333;
  padding: 4px 15px;
  margin-right: 5px;
  border-radius: 20px;
  background-color: ${(props) => (props.selected ? "#444" : "#222")};
  width: fit-content;
  white-space: nowrap;

  svg {
    color: white;
    margin-right: 10px;
  }

  span {
    color: white;
    line-height: 30px;
    font-size: 14px;
    white-space: nowrap;
    width: fit-content;
  }
`;

function LocationPillComponent({ locationName, selected, onClick }) {
  return (
    <LocationPill selected={selected} onClick={onClick}>
      <FontAwesomeIcon icon={faLocationDot} />
      <span>{locationName}</span>
    </LocationPill>
  );
}

const ratings = [
  "green",
  "yellow",
  "orange",
  "red",
  "purple",
  "black",
  "white",
];

const location = [
  "Training Cave",
  "Comp Wall",
  "Cave",
  "Alcove",
  "Arch",
  "Amphitheater",
  "Topout",
];

const ApplyButtonFilter = styled.button`
  border: none;
  height: 40px;
  border-radius: 20px;
  width: 100%;
  font-size: 16px;
  color: white;
  font-weight: bolder;
  background: linear-gradient(-45deg, #0072ff, #00c6ff);
`;

const CollapsedFilterDiv = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 50px;
  background-color: #222;
  display: ${(props) => (props.expanded ? "none" : "flex")};
  z-index: 100;
`;

const CollapsedFilterSection = styled.div`
  display: flex;
  overflow: scroll;
  margin-top: 6.5px;
  margin-left: 10px;
`;

const CollapsedFilterTitle = styled.span`
  color: white;
  line-height: 53px;
  font-size: 24px;
  padding: 0 10px;
  border-right: 1px solid #333;
`;

export function BoulderMapFilter({
  selectedRatings,
  setSelectedRatings,
  selectedLocations,
  setSelectedLocations,
}) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
      {/*TODO MOVE TO SEPARATE COMPONENT*/}
      <CollapsedFilterDiv
        expanded={expanded}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <CollapsedFilterTitle>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </CollapsedFilterTitle>
        <CollapsedFilterSection>
          {selectedRatings.map((rating) => (
            <RatingPillComponent
              color={rating}
              selected={true}
              onClick={() => {}}
            />
          ))}
          {selectedLocations.map((location) => (
            <LocationPillComponent
              locationName={location}
              selected={true}
              onClick={() => {}}
            />
          ))}
          {/*<RatingPillComponent*/}
          {/*  color="green"*/}
          {/*  selected={true}*/}
          {/*  onClick={() => {}}*/}
          {/*/>*/}
        </CollapsedFilterSection>
      </CollapsedFilterDiv>

      {/*TODO MOVE TO SEPARATE COMPONENT*/}
      <ExpandedFilterDiv expanded={expanded}>
        <ExpandedFilterTitle>Filter Current Boulders</ExpandedFilterTitle>
        <FilterSection>
          <FilterSectionTitle>Choose Grades</FilterSectionTitle>
          <FilterOptions>
            {ratings.map((color) => (
              <RatingPillComponent
                color={color}
                key={color}
                selected={selectedRatings.includes(color)}
                onClick={() => {
                  setSelectedRatings(
                    selectedRatings.includes(color)
                      ? selectedRatings.filter((rating) => rating !== color)
                      : [...selectedRatings, color]
                  );
                }}
              />
            ))}
          </FilterOptions>
        </FilterSection>
        <FilterSection>
          <FilterSectionTitle>Choose Locations</FilterSectionTitle>
          <FilterOptions>
            {location.map((locationName) => (
              <LocationPillComponent
                locationName={locationName}
                key={locationName}
                selected={selectedLocations.includes(locationName)}
                onClick={() => {
                  setSelectedLocations(
                    selectedLocations.includes(locationName)
                      ? selectedLocations.filter(
                          (rating) => rating !== locationName
                        )
                      : [...selectedLocations, locationName]
                  );
                }}
              />
            ))}
          </FilterOptions>
        </FilterSection>
        <FilterSection>
          <ApplyButtonFilter
            onClick={() => {
              setExpanded(false);
            }}
          >
            Filter
          </ApplyButtonFilter>
        </FilterSection>
      </ExpandedFilterDiv>
    </>
  );
}
