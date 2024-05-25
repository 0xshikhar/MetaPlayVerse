"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StreamPlayer from "./StreamPlayer";

const StreamDashboard = (params) => {
  const [streamKey, setStreamKey] = useState("");
  const [getStreamInfo, setGetStreamInfo] = useState("");
  const router = useRouter();

  async function fetchData() {
    try {
      const res = await fetch(`/api/stream/${params.id}`);
      const data = await res.json();
      console.log(data);
      setGetStreamInfo(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    console.log("query", params.id);
    fetchData();
  }, []);
  return (
    <div className="mt-8 flex flex-row justify-between gap-4 p-16 min-h-screen text-white">
      <div className="mb-8 flex flex-col justify-start ml-16">
        <h1 className="text-2xl">{getStreamInfo.name}</h1>
        <h2>
          Stream ID: <span>{getStreamInfo.id}</span>
        </h2>
        <h2>
          Stream Key: <span>{getStreamInfo.streamKey}</span>{" "}
        </h2>
        <h2>Stream Status: <span>{getStreamInfo.isActive == false ? "Inactive" : "Active"}</span></h2>
        <h2>Playback ID: <span>{getStreamInfo.playbackId}</span></h2>
      </div>
      <div className="bg-white border-white h-[30%] w-[40%] mr-10">
        <StreamPlayer id={getStreamInfo.playbackId} />
      </div>
    </div>
  );
};

export default StreamDashboard;
