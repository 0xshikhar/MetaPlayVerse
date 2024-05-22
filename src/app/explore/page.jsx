import React from "react";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import Image from "next/image";

const explore = () => {
    return (
        <div className="min-h-screen bg-black">
            <figure className="flex flex-col items-center justify-center pt-10 pb-10 ">
                <div className="rounded-xl bg-[url('https://shikhar.xyz/wp-content/uploads/2023/06/eventPage.png')] before:bg-center before:opacity-0 ">
                    <div className="text-left pb-10 align-middle min-w-[1100px] h-[300px] pl-10 p-5 dark:bg-gray-800 dark:border-gray-700">
                        <div className=" text-white font-Agda text-[70px] uppercase max-w-[650px]">
                            Explore Event
                        </div>
                        <p className="text-white font-Outfit font-light pb-9">
                            Your Favorite Game Streaming Events are here
                        </p>
                        <Link
                            href="/livestream"
                            className="inline-flex align-left items-center relative text-lg px-8 py-3 bg-white  mr-5 uppercase font-Agda font-bold text-b hover:bg-[#f0f0f0] cursor-pointer" >
                            Join Live Event
                            <BsArrowRight className=' ml-2' />
                        </Link>
                    </div>
                </div>
            </figure>

            <div>
                <div className="flex flex-col justify-center items-center content-center ">
                    {/* map nft data here using Event Card component to show multiple events*/}
                    <div className="flex flex-row p-10">
                        {/* creating duplicate events */}
                        <div className="card card-compact mx-5 w-[400px] bg-[#202020] p-4 text-white shadow-xl">
                            <figure>
                                <Image
                                    src="/images/sui.png"
                                    alt="Gaming Trends on Sui"
                                    width={500} height={200}
                                />
                            </figure>
                            <div className="card-body">
                                <div className="flex">
                                    <div className="font-Agda text-[18px] uppercase text-[#98ee2c]"> Nov 02</div>
                                    <div className="font-Agda text-[18px] uppercase px-2"> Starting At 6:00PM</div>
                                    <div className="text-end justify-end">
                                        <BiHeart />
                                    </div>
                                </div>
                                <h2 className="card-title font-Montserrat text-[24px] pb-4">Gaming Trends on Sui</h2>
                                <div className="flex ">
                                    <button
                                        className="flex justify-start relative text-lg px-8 py-3 bg-[#98ee2c]  mr-5 uppercase font-Agda font-bold text-black hover:bg-[#f0f0f0] cursor-pointer" >
                                        Watch Live
                                        <BsArrowRight className='mt-1 ml-2' />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card card-compact mx-5 w-[400px] bg-[#202020] p-4 text-white shadow-xl">
                            <figure>
                                <Image
                                    src="/images/howtoplayumi.jpeg"
                                    alt="Umi's Friends Stream"
                                    width={500} height={200}
                                />
                            </figure>
                            <div className="card-body">
                                <div className="flex">
                                    <div className="font-Agda text-[18px] uppercase text-[#98ee2c]"> Oct 20</div>
                                    <div className="font-Agda text-[18px] uppercase px-2"> Starting At 6:00PM</div>
                                    <div className="text-end justify-end">
                                        <BiHeart />
                                    </div>
                                </div>
                                <h2 className="card-title font-Montserrat text-[24px] pb-4">Tutorial: How to play Umi&rsquo;s friends and setup account
                                </h2>
                                <div className="flex ">
                                    <button
                                        className="flex justify-start relative text-lg px-8 py-3 bg-[#98ee2c]  mr-5 uppercase font-Agda font-bold text-black hover:bg-[#f0f0f0] cursor-pointer" >
                                        Watch Live
                                        <BsArrowRight className='mt-1 ml-2' />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card card-compact mx-5 w-[400px] bg-[#202020] p-4 text-white shadow-xl">
                            <figure>
                                <Image
                                    src="/images/Cyberpet.png"
                                    alt="CyberPet"
                                    width={500} height={200}
                                />
                            </figure>
                            <div className="card-body">
                                <div className="flex">
                                    <div className="font-Agda text-[18px] uppercase text-[#98ee2c]"> Nov 04</div>
                                    <div className="font-Agda text-[18px] uppercase px-2"> Starting At 6:00PM</div>
                                    <div className="text-end justify-end">
                                        <BiHeart />
                                    </div>
                                </div>
                                <h2 className="card-title font-Montserrat text-[24px] pb-4"> Update: CyberPet introduces new skins and muchmore!
                                </h2>
                                <div className="flex ">
                                    <button
                                        className="flex justify-start relative text-lg px-8 py-3 bg-[#98ee2c]  mr-5 uppercase font-Agda font-bold text-black hover:bg-[#f0f0f0] cursor-pointer" >
                                        Watch Live
                                        <BsArrowRight className='mt-1 ml-2' />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-row p-10">
                        {/* creating duplicate events */}
                        <div className="card card-compact mx-5 w-[400px] bg-[#202020] p-4 text-white shadow-xl">
                            <figure>
                                <Image
                                    src="/sui.png"
                                    alt="Gaming Trends on sui"
                                    width={500} height={200}
                                />
                            </figure>
                            <div className="card-body">
                                <div className="flex">
                                    <div className="font-Agda text-[18px] uppercase text-[#98ee2c]"> Nov 02</div>
                                    <div className="font-Agda text-[18px] uppercase px-2"> Starting At 6:00PM</div>
                                    <div className="text-end justify-end">
                                        <BiHeart />
                                    </div>
                                </div>
                                <h2 className="card-title font-Montserrat text-[24px] pb-4">Gaming Trends on Sui</h2>
                                <div className="flex ">
                                    <button
                                        className="flex justify-start relative text-lg px-8 py-3 bg-[#98ee2c]  mr-5 uppercase font-Agda font-bold text-black hover:bg-[#f0f0f0] cursor-pointer" >
                                        Watch Live
                                        <BsArrowRight className='mt-1 ml-2' />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card card-compact mx-5 w-[400px] bg-[#202020] p-4 text-white shadow-xl">
                            <figure>
                                <Image
                                    src="/images/howtoplayumi.jpeg"
                                    alt="Umi's Friends Stream"
                                    width={500} height={200}
                                />
                            </figure>
                            <div className="card-body">
                                <div className="flex">
                                    <div className="font-Agda text-[18px] uppercase text-[#98ee2c]"> Oct 20</div>
                                    <div className="font-Agda text-[18px] uppercase px-2"> Starting At 6:00PM</div>
                                    <div className="text-end justify-end">
                                        <BiHeart />
                                    </div>
                                </div>
                                <h2 className="card-title font-Montserrat text-[24px] pb-4">Tutorial: How to play Umi&rsquo;s friends and setup account
                                </h2>
                                <div className="flex ">
                                    <button
                                        className="flex justify-start relative text-lg px-8 py-3 bg-[#98ee2c]  mr-5 uppercase font-Agda font-bold text-black hover:bg-[#f0f0f0] cursor-pointer" >
                                        Watch Live
                                        <BsArrowRight className='mt-1 ml-2' />
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div className="card card-compact mx-5 w-[400px] bg-[#202020] p-4 text-white shadow-xl">
                            <figure>
                                <Image
                                    src="/images/Cyberpet.png"
                                    alt="CyberPet"
                                    width={500} height={200}
                                />
                            </figure>
                            <div className="card-body">
                                <div className="flex">
                                    <div className="font-Agda text-[18px] uppercase text-[#98ee2c]"> Nov 04</div>
                                    <div className="font-Agda text-[18px] uppercase px-2"> Starting At 6:00PM</div>
                                    <div className="text-end justify-end">
                                        <BiHeart />
                                    </div>
                                </div>
                                <h2 className="card-title font-Montserrat text-[24px] pb-4"> Update: CyberPet introduces new skins and muchmore!
                                </h2>
                                <div className="flex ">
                                    <button
                                        className="flex justify-start relative text-lg px-8 py-3 bg-[#98ee2c]  mr-5 uppercase font-Agda font-bold text-black hover:bg-[#f0f0f0] cursor-pointer" >
                                        Watch Live
                                        <BsArrowRight className='mt-1 ml-2' />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default explore;
