"use client"

import React, { useEffect, useState } from "react";
import StreamPlayer from "../../components/StreamPlayer";
import Image from "next/image";
import gameImage from "../../../../public/images/godOfWar.jpg";
import { BiHeart } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { Player } from "@livepeer/react";

const streamingPage = (props) => {
    console.log(props.id);
    const id = props.id;
    const name = props.name;

    return (
        <div className="min-h-screen pb-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black">
            {/* <StreamPlayer /> */}
            {/* stream component */}
            <div>
                <div className="flex flex-col items-center justify-center mx-8 pt-5 ">
                    <div className="text-center align-middle w-full  p-2 bg-purple-700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <StreamPlayer id={id} />
                    </div>
                </div>
            </div>
            <div className="text-white align-baseline ">
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <div className="flex">
                        <p>
                            Watch Finals here
                        </p>
                        <div className="justify-end">
                            <BiHeart />
                        </div>
                    </div>
                    <div className="card-actions justify-end">
                        {/* <button className="btn btn-primary">Buy Now</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default streamingPage;
