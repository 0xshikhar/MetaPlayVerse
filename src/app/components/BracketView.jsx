import React, { useEffect, useState } from "react";

const BracketView = () => {
  async function fetchData() {
    try {
      const response = await fetch("/api/db");
      console.log("response found!");
      const data = await response.json();
      console.log(data);
      window.bracketsViewer.render({
        stages: data.stage,
        matches: data.match,
        groups: data.group,
        participants: data.participant,
      });
      // const convertedData = convertData(data);
      if (response.ok) {
        console.log("success");
      } else {
        console.log("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      alert(
        "Failed to fetch data from localhost. Please make sure the server is running."
      );
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return <div className="brackets-viewer"></div>;
};

export default BracketView;
