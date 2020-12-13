import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { TextField } from "@material-ui/core/";

export default function GeneralSearch({
  setAddress,
  address,
  setCoords,
  setSearchQ,
}) {
  const handleChange = (address) => {
    setAddress(address);
    setAddress(address);
    if (address === "") {
      setSearchQ("");
    }
  };

  const handleSelect = async (address) => {
    setAddress(address);
    setSearchQ(address);
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setCoords(latLng);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={{
        types: ["(cities)"],
        componentRestrictions: { country: "us" },
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField
            {...getInputProps({
              placeholder: "Search Places ...",
              className: "location-search-input",
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  key={suggestion.placeId}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
