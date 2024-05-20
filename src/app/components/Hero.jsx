import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';

const style = {
    wrapper: `relative`,
    container: `before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://shikhar.xyz/wp-content/uploads/2023/06/hero.png')] before:bg-center before:opacity-100 `,
    contentWrapper: `h-screen relative justify-center flex-wrap items-center`,
    copyContainer: `p-10 pl-[100px] pt-[100px] w-3/5`,
    title: `relative text-white text-[80px] font-Agda mb-[2.5rem] `,
    description: `flex text-[#cccccc] container-[400px] text-3xl font-Outfit mt-[0.8rem] mb-[.5rem]`,
    ctaContainer: `flex`,
    accentedButton: ` flex relative text-lg font-semibold px-12 text-black py-4 bg-white  mr-5 text-black hover:bg-[#98ee2c] cursor-pointer`,
    button: `flex relative text-lg font-semibold px-12 py-4 bg-[#98ee2c] mr-5 text-black hover:bg-[#f0f0f0] cursor-pointer`,
    cardContainer: `rounded-[3rem] before:bg-gray-500 before:opacity-5`,
    infoContainer: `h-20  p-4 rounded-b-lg flex items-center text-white`,
    author: `flex flex-col justify-center ml-4`,
    name: ``,
    infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
};

const Hero = () => {

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.contentWrapper}>
                    <div className={style.copyContainer}>
                        <div className='flex'>
                            <div className={style.description}>Introducing
                            </div>
                            <div className='px-2 text-[#98ee2c] mt-[0.8rem] mb-[.5rem] font-bold text-3xl font-serif '>
                                PlayVerse
                            </div>
                        </div>

                        <div className={style.title}>
                            Stream & Organize Games on the SUI Blockchain
                        </div>

                        <div className={style.ctaContainer}>
                            <Link href="/explore">
                                <button className={style.accentedButton} >Explore <BsArrowRight className='mt-1 ml-2' /></button>
                            </Link>
                            <Link href="/nft">
                                <button className={style.button}>Create Stream <BsArrowRight className='mt-1 ml-2' /></button>
                            </Link>
                        </div>
                        
                    </div>
                    <div className={style.cardContainer}>
                    

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
