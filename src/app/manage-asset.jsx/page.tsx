// import { Player, useAssetMetrics, useCreateAsset } from "@livepeer/react";
// import { useCallback, useContext, useEffect, useMemo, useState } from "react";
// import { Types } from "aptos";
// import {
//   CreateAptosTokenBody,
//   CreateAptosTokenResponse,
// } from "../pages/api/create-sui-nft";
// // import { AptosContext } from "../pages/_app";
// import { SuiClient } from "@mysten/sui.js/client";
// import { ADMIN_ADDRESS, SUI_NETWORK } from "../client/config";
// import { useDropzone } from "react-dropzone";

// const Asset = () => {
//   const [video, setVideo] = useState(undefined);
//   const [address, setAddress] = useState("");
//   const [creatingNFT, setIsCreatingNft] = useState(false);

//   const suiClient = new SuiClient({ url: SUI_NETWORK });

//   const {
//     mutate: createAsset,
//     data: asset,
//     status,
//     progress,
//     error,
//   } = useCreateAsset(
//     video
//       ? {
//           sources: [
//             {
//               name: video.name,
//               file: video,
//               storage: {
//                 ipfs: true,
//                 metadata: {
//                   name: video.name,
//                   description: "description",
//                 },
//               },
//             },
//           ],
//         }
//       : null
//   );
//   const { data: metrics } = useAssetMetrics({
//     assetId: asset?.[0].id,
//     refetchInterval: 30000,
//   });

//   //adding video files
//   const onDrop = useCallback(async (acceptedFiles) => {
//     if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
//       setVideo(acceptedFiles[0]);
//     }
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: {
//       "video/*": ["*.mp4"],
//     },
//     maxFiles: 1,
//     onDrop,
//   });

//   const isLoading = useMemo(
//     () =>
//       status === "loading" ||
//       (asset?.[0] && asset[0].status?.phase !== "ready"),
//     [status, asset]
//   );

//   const progressFormatted = useMemo(() => {
//     if (progress?.[0]?.phase === "failed") {
//       return "Failed to process video.";
//     } else if (progress?.[0]?.phase === "waiting") {
//       return "Waiting...";
//     } else if (progress?.[0]?.phase === "uploading") {
//       return `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`;
//     } else if (progress?.[0]?.phase === "processing") {
//       return `Processing: ${Math.round(progress?.[0].progress * 100)}%`;
//     } else {
//       return null;
//     }
//   }, [progress]);
//   if (asset) {
//     console.log(asset[0]);
//   }

//   useEffect(() => {
//     console.log(window.aptos);
//     // setAddress(account.address);
//   }, []);

//   const mintNft = useCallback(async () => {
//     setIsCreatingNft(true);
//     const account = await window.aptos.account();
//     setAddress(account.address);
//     console.log(suiClient);
//     console.log(address);
//     console.log(asset[0].storage.ipfs.nftMetadata.url);
//     try {
//       if (address && suiClient) {
//         const body = {
//           receiver: address,
//           metadataUri: asset[0].storage.ipfs.nftMetadata.url,
//         };

//         const response = await fetch("/api/create-aptos-nft", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(body),
//         });

//         const json = await response.json();

//         if (json.tokenName) {
//           const createResponse = json;

//           const transaction = {
//             type: "entry_function_payload",
//             function: "0x3::token_transfers::claim_script",
//             arguments: [
//               createResponse.creator,
//               createResponse.creator,
//               createResponse.collectionName,
//               createResponse.tokenName,
//               createResponse.tokenPropertyVersion,
//             ],
//             type_arguments: [],
//           };

//           const aptosResponse = await window.aptos.signAndSubmitTransaction(
//             transaction
//           );

//           const result = await suiClient.waitForTransactionWithResult(
//             aptosResponse.hash,
//             { checkSuccess: true }
//           );

//           setCreationHash(result.hash);
//         }
//       }
//     } catch (e) {
//       console.error(e);
//     } finally {
//       console.log("error");
//       setIsCreatingNft(false);
//     }
//   }, [
//     address,
//     suiClient,
//     asset?.storage?.ipfs?.nftMetadata?.url,
//     setIsCreatingNft,
//   ]);

//   return (
//     <div className="container">
//       <div className="center">
//         {!asset && (
//           <div className="dropzone" {...getRootProps()}>
//             <input {...getInputProps()} />
//             <button className="browse-button">Browse Files</button>

//             {error?.message && <p>{error.message}</p>}
//           </div>
//         )}

//         {asset?.[0]?.playbackId && (
//           <Player title={asset[0].name} playbackId={asset[0].playbackId} />
//         )}

//         <div>
//           {metrics?.metrics?.[0] && (
//             <p>Views: {metrics?.metrics?.[0]?.startViews}</p>
//           )}

//           {video ? <p>{video.name}</p> : <p className="text-white font-bold">Select a video file to upload.</p>}

//           {progressFormatted && <p>{progressFormatted}</p>}

//           {!asset?.[0].id && (
//             <div>
//               <button
//                 onClick={() => {
//                   createAsset?.();
//                 }}
//                 disabled={isLoading || !createAsset}
//                 className="upload-button"
//               >
//                 Upload
//               </button>
//             </div>
//           )}
//           {asset?.[0].id && (
//             <div>
//               <button onClick={mintNft} className="upload-button">
//                 Mint
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         .container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 100vh;
//           background-color: black;
//         }

//         .center {
//           text-align: center;
//         }

//         .dropzone {
//           border: 2px dashed #98ee2c;
//           padding: 20px;
//           border-radius: 50%;
//           width: 200px;
//           height: 200px;
//           display: flex;
//           flex-direction: column;s
//           justify-content: center;
//           align-items: center;
//           margin-bottom: 20px;
//         }

//         .dropzone p {
//           margin: 0;
//         }

//         .browse-button {
//           background-color: dark;
//           color: white;
//           padding: 10px 20px;
//           border: none;
//           border-radius: 5px;
//           cursor: pointer;
//         }

//         .upload-button {
//           background-color: #98ee2c;
//           color: white;
//           margin-top: 10px;
//           border-radius: 20px;
//           width: 200px;
//           height: 50px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Asset;

const Asset = () => {
    return <div>asset page</div>;
}

export default Asset;

