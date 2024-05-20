"use client"

import React, { useState, useEffect, useRef } from "react";
import { BsArrowRight } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

const EventForm = () => {
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventImage, setEventImage] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const profiles = [
        {
            name: "720p",
            bitrate: 2000000,
            fps: 30,
            width: 1280,
            height: 720,
        },
        {
            name: "480p",
            bitrate: 1000000,
            fps: 30,
            width: 854,
            height: 480,
        },
        {
            name: "360p",
            bitrate: 500000,
            fps: 30,
            width: 640,
            height: 360,
        },
    ];

    const Submit = async (event) => {
        event.preventDefault();

        try {
            console.log(eventName);
            const response = await fetch("/api/stream/createStream", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: eventName,
                    profiles,
                }),
            });

            setEventName("");
            const data = await response.json();
            console.log(data);
            const route = data.id;
            router.push({ pathname: `/dashboard/${route}` });
        } catch (error) {
            console.error(error);
        }
    };

    const nameHandler = (event) => {
        setEventName(event.target.defaultValue);
    };

    const descriptionHandler = (event) => {
        setEventDescription(event.target.defaultValue);
    };

    const imageHandler = (event) => {
        // do ipfs upload here and set the image url to eventImage
        setEventImage(event.target.defaultValue);
    };

    const timeHandler = (event) => {
        setEventTime(event.target.defaultValue);
    };

    return (
        <div>
            {/* create event form  */}
            <div className="w-full pt-5 max-w-lg">
                <form onSubmit={Submit}>
                    <div className="flex justify-end flex-col text-left mb-6">
                        <label
                            htmlFor="text"
                            className=" mb-2 text-lg font-medium text-white dark:text-white"
                        >
                            {" "}
                            Event Name
                        </label>
                        <input
                            type="text"
                            id="input-name"
                            defaultValue={eventName}
                            onChange={nameHandler}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="MegaRun 2 Live Stream"
                            required
                        />
                    </div>
                    <div className=" flex flex-col text-left mb-6">
                        <label
                            htmlFor="text"
                            className=" mb-2 text-lg font-medium text-white dark:text-white"
                        >
                            {" "}
                            Event Description
                        </label>
                        <input
                            type="text"
                            id="input-name"
                            defaultValue={eventDescription}
                            onChange={descriptionHandler}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Write about your event details here"
                            required
                        />
                    </div>

                    <div className=" flex flex-col text-left mb-6">
                        <label
                            htmlFor="text"
                            className=" mb-2 text-lg font-medium text-white dark:text-white"
                        >
                            Upload Event Banner
                        </label>
                        <input
                            type="file"
                            id="input-name"
                            onChange={imageHandler}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required
                        />
                    </div>

                    <div className=" flex flex-col text-left mb-6">
                        <label
                            htmlFor="text"
                            className=" mb-2 text-lg font-medium text-white dark:text-white"
                        >
                            Select Event Time
                        </label>
                        {/* take input of calander date and time */}
                        <div className="bg-white  block w-full p-2 rounded-lg">
                            <DatePicker
                                placeholderText="2023-07-01 10:00"
                                selected={eventTime}
                                onChange={(date) => setEventTime(date)}
                                defaultdefaultValue={eventTime}
                                showTimeSelect
                                timeFormat="HH:mm"
                                dateFormat="yyyy-MM-dd HH:mm"
                            />
                        </div>
                    </div>

                    <button
                        onClick={Submit}
                        onChange={timeHandler}
                        className="flex justify-start relative text-lg px-8 py-3 bg-[#98ee2c]  mr-5 uppercase font-Agda font-bold text-black hover:bg-[#f0f0f0] cursor-pointer" >
                        List Your Event
                        <BsArrowRight className=' ml-2' />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EventForm;
