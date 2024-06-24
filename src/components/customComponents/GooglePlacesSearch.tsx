"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

const GooglePlacesSearch = ({ coordinates, selectedAddress }: any) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="w-full">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}&libraries=places`}
        onLoad={() => setLoaded(true)}
        strategy="afterInteractive"
      />
      {loaded && (
        <GooglePlacesAutocomplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
          selectProps={{
            autoFocus: true,
            className: "",
            closeMenuOnSelect: true,
            placeholder: "Please search address",
            isClearable: true,
            onChange: (place: any) => {
              // console.log(place);
              selectedAddress(place);
              geocodeByAddress(place?.label)
                .then((results) => getLatLng(results[0]))
                .then(({ lat, lng }) => {
                  coordinates({ lat, lng });
                  // console.log("Successfully got latitude and longitude", {
                  //   lat,
                  //   lng,
                  // });
                });
            },
          }}
        />
      )}
    </div>
  );
};

export default GooglePlacesSearch;
