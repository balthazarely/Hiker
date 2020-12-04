import React from "react";
import { useParams } from "react-router-dom";

export default function SingleTrailPage() {
  const { id } = useParams();

  return <div>I am the results page: {id}</div>;
}
