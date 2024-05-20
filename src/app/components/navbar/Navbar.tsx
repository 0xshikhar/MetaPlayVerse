"use client";

import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/navigation";
import React, { useEffect, useState, useLayoutEffect } from "react";
import Logo from '../../../../public/images/playVerseLogo.png'
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import { generateNonce, generateRandomness } from '@mysten/zklogin';
import { useSui } from "@/app/hooks/useSui";
import { UserKeyData } from "@/app/types/UsefulTypes";
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { Keypair, PublicKey } from "@mysten/sui.js/cryptography";

import {
  ConnectButton,
  useAccountBalance,
  useWallet,
  SuiChainId,
  ErrorCode,
  formatSUI
} from "@suiet/wallet-kit";


const style = {
  wrapper: `bg-black w-screen px-[1.2rem] py-[0.8rem] flex `,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center align-right justify-end`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
};

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const wallet = useWallet();

  const { suiClient } = useSui();
  const [loginUrl, setLoginUrl] = useState<string | null>();

  async function prepareLogin() {
    const { epoch, epochDurationMs, epochStartTimestampMs } = await suiClient.getLatestSuiSystemState();


    const maxEpoch = parseInt(epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
    const ephemeralKeyPair: Keypair = new Ed25519Keypair();
    const ephemeralPrivateKeyB64 = ephemeralKeyPair.export().privateKey;


    const ephemeralPublicKey: PublicKey = ephemeralKeyPair.getPublicKey()
    const ephemeralPublicKeyB64 = ephemeralPublicKey.toBase64();

    const jwt_randomness = generateRandomness();
    const nonce = generateNonce(ephemeralPublicKey, maxEpoch, jwt_randomness);

    console.log("current epoch = " + epoch);
    console.log("maxEpoch = " + maxEpoch);
    console.log("jwt_randomness = " + jwt_randomness);
    console.log("ephemeral public key = " + ephemeralPublicKeyB64);
    console.log("nonce = " + nonce);

    const userKeyData: UserKeyData = {
      randomness: jwt_randomness.toString(),
      nonce: nonce,
      ephemeralPublicKey: ephemeralPublicKeyB64,
      ephemeralPrivateKey: ephemeralPrivateKeyB64,
      maxEpoch: maxEpoch
    }
    localStorage.setItem("userKeyData", JSON.stringify(userKeyData));
    return userKeyData
  }


  function getRedirectUri() {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const customRedirectUri = protocol + "//" + host + "/auth";
    console.log("customRedirectUri = " + customRedirectUri);
    return customRedirectUri;
  }

  useLayoutEffect(() => {

    prepareLogin().then((userKeyData) => {

      const REDIRECT_URI = 'https://zklogin-dev-redirect.vercel.app/api/auth';
      const customRedirectUri = getRedirectUri();
      const params = new URLSearchParams({
        // When using the provided test client ID + redirect site, the redirect_uri needs to be provided in the state.
        state: new URLSearchParams({
          redirect_uri: customRedirectUri
        }).toString(),
        // Test Client ID for devnet / testnet:
        client_id: '595966210064-3nnnqvmaelqnqsmq448kv05po362smt2.apps.googleusercontent.com',
        redirect_uri: REDIRECT_URI,
        response_type: 'id_token',
        scope: 'openid',
        nonce: userKeyData.nonce,
      });

      setLoginUrl(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
    });
  }, []);


  return (
    <div className={style.wrapper}>
      <Link
        href="/"
        rel="noopener noreferrer"
        passHref
        className="text-secondary hover:text-white"
      >
        <div className="flex items-center cursor-pointer">
          <Image src={Logo} height={30} width={50} alt="logo" />

          <div className="ml-[0.8rem] text-white text-2xl font-serif">SUI PlayVerse</div>
        </div>
      </Link>
      {/* search bar to search streams */}
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          className={style.searchInput}
          type="text"
          value={searchQuery}
          placeholder="Enter Your Streaming ID"
        //  onKeyPress={(e) => {
        // if (e.key === 'Enter')
        //     console.log(searchQuery)
        // }}
        />
        <button
          onClick={() => {
            router.push(`/streaming/${searchQuery}`);
          }}
          className="text-white px-2"
        >
          Search
        </button>
      </div>

      <div className={style.headerItems}>
        <Link href="/streaming">
          {/* <div className={style.headerItem}> Streaming </div> */}
        </Link>
        <div
          className={style.headerItem}
          onClick={() => {
            router.push("/tournament");
          }}
        >
          Tournament
        </div>
        <div
          className={style.headerItem}
          onClick={() => {
            router.push("/nft");
          }}
        >
          Mint NFT
        </div>
        {/* <div
          className={style.headerIcon}
          onClick={() => {
            router.push(`/profile/${address}`);
          }}
        >
          <CgProfile />
        </div> */}
        <div className={style.headerIcon}>
          <div className="flex space-x-4 justify-center">
            <a href={loginUrl || ""}
              className="hover:text-blue-600"
              target="_blank">

              <button
                className="bg-white text-gray-700  hover:text-gray-900 py-2 px-4 border rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28"
                  viewBox="0 0 48 48">
                  <path fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  <path fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                  <path fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                  <path fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                <span className="text-lg"> Login With Google</span>
              </button>
            </a>

          </div>
        </div>
        <div className="text-black z-40">
          <ConnectButton className="bg-gradient-to-l from-[#98ee2c] to-green-400 ">
            Connect Wallet
          </ConnectButton>
        </div>
      </div>

      {/* {wallet && wallet.connected && (
        <div >
          <Toaster />
        </div>
      )} */}

    </div>

  );
};
