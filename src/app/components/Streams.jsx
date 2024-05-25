"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Player } from "@livepeer/react";
import logo from "../../../public/images/Cyberpet.png";
import { useRouter } from "next/navigation";

export default function Streams() {
  const [streams, setStreams] = useState([]);
  const router = useRouter();
  async function fetchData() {
    try {
      const res = await fetch("/api/stream/getStreams");
      const data = await res.json();
      console.log(data);
      setStreams(data);
    } catch (error) {}
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-[100vh] flex-1 flex flex-col justify-start items-center">
      <h1 className="my-10 leading-5 text-5xl text-white font-bold">All Live Events</h1>

      <ul className="grid grid-cols-3 gap-4">
        {streams.map((stream) => (
          <div
            className="card card-compact mx-5 w-[400px] bg-base-100 shadow-xl mt-4"
            key={stream.id}
          >
            <div
              onClick={() => {
                router.push({
                  pathname: `/streaming/${stream.playbackId}`,
                  query: { id: stream.playbackId, name: stream.name },
                });
              }}
              
            >
              {/* <a> */}
              {stream.isActive ? (
                <div>
                  <h2 className="card-title"> Now Watching: {stream.name} </h2>
                  <Player
                    playbackId={`${stream.playbackId}`}
                    className=""
                    autoPlay={false}
                    loop
                    muted
                  />
                </div>
              ) : (
                <Image
                  src={logo}
                  alt="Cover Photo"
                  width="400"
                  height="400"
                  className="p-3"
                />
              )}
              <div className="p-2 flex flex-col justify-center items-center">
                <h2 className="card-title pl-3"> {stream.name} </h2>
                <div className="flex flex-row pl-3 items-center justify-center">
                  <p className="text-xl">Status:</p>
                  {stream.isActive ? (
                    <p className="m-0 text-[1rem] text-[#22c55e]">Live Now!</p>
                  ) : (
                    <p className="m-0 ml-3 text-[1rem] leading-[1.5px] text-[#ef4444]">
                      Not Live
                    </p>
                  )}
                </div>
              </div>

              {/* </a> */}
            </div>
          </div>
        ))}
      </ul>
    </main>
  );
}
