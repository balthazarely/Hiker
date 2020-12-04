import React from "react";
import EventSingle from "./EventSingle";
import { useSelector } from "react-redux";

export default function EventsList() {
  const fetchedEvents = useSelector((state) => state.event.events);

  return (
    <div>
      {fetchedEvents &&
        fetchedEvents.map((event) => {
          return <EventSingle event={event} key={event.id} />;
        })}
    </div>
  );
}
