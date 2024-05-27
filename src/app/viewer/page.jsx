"use client";

import { useRouter, usePathname, useSearchParams  } from "next/navigation";
import React, { useEffect, useState } from "react";
import Tournament from "../components/Tournament";
import BracketView from "../components/BracketView";
import { parse } from "postcss";

const Viewer = () => {
    const [gameId, setGameId] = useState(1);
    const [opp1Data, setOpp1Data] = useState(0);
    const [opp2Data, setOpp2Data] = useState(0);

    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const storedGameId = localStorage.getItem("gameId");
        console.log(storedGameId);
        if (storedGameId !== null && storedGameId !== "0") {
            setGameId(parseInt(storedGameId));
        }
    }, []);

    const handleUpdate = async (event) => {
        event.preventDefault();
        console.log("data updating..");
        try {
            const gameIdForServer = gameId - 1;
            console.log(gameIdForServer);
            const response = await fetch("/api/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    opp1Data,
                    opp2Data,
                    gameIdForServer,
                }),
            });

            if (response.ok) {
                // Handle successful response
                const inc = parseInt(gameId) + 1;
                console.log(inc);
                localStorage.setItem("gameId", inc);
                console.log("Data sent successfully!");
                const checkgameid = localStorage.getItem("gameId");
                console.log(checkgameid);
                setTimeout(() => {
                    location.reload();
                }, 3000);
            } else {
                // Handle error response
                console.log("Failed to send data!");
            }
        } catch (error) {
            // Handle network error
            console.error("Failed to send data:", error);
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const tournamentId = localStorage.getItem("TournId");
            console.log(tournamentId);
            const response = await fetch("/api/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tournamentId,
                }),
            });

            if (response.ok) {
                console.log("tournament deleted successfully!");
                router.push("/thankyou");
            } else {
                console.log("failed to delete data!");
            }
        } catch (error) {
            console.log("Failed to delete tournament:", error);
        }
    };

    const handleOpp1Data = (event) => {
        setOpp1Data(event.target.value);
    };

    const handleOpp2Data = (event) => {
        setOpp2Data(event.target.value);
    };

    return (
        <div className="flex flex-col text-gray-500">
            <div className="flex justify-center mt-10">
                <h1 className="text-4xl font-[700]">
                    {tname ? tname : "Tournament Name"}
                </h1>
            </div>
            <div className="h-[480px] w-[800px] flex flex-row justify-center content-center mb-[2rem] rounded-[10px] bg-white ml-[25%]">
                <BracketView />
            </div>

            <div className="flex flex-col">
                <h1 className="flex justify-center text-xl">Update Tournament Data</h1>
                <div className="flex flex-row items-center justify-center">
                    Enter Data of Game {gameId} =
                    <div className="flex flex-col ml-2 gap-2 p-2 items-center">
                        <input
                            type="number"
                            placeholder="Opponent 1(Top)"
                            className="rounded-[5px] p-1 pl-2"
                            required
                            onChange={handleOpp1Data}
                        ></input>
                        <input
                            type="number"
                            placeholder="Opponent 2(Above)"
                            className="rounded-[5px] p-1 pl-2"
                            required
                            onChange={handleOpp2Data}
                        ></input>
                        <button
                            className="bg-white text-black rounded-[5px] w-[80px] flex justify-center mt-3"
                            onClick={handleUpdate}
                        >
                            Update
                        </button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Viewer;

// import React, { useEffect } from "react";

// const Viewer = () => {
//   async function render() {
//     try {
//       const response = await fetch("/api/db");
//       console.log("response found!");
//       const data = await response.json();
//       console.log(data);

//       // const convertedData = convertData(data);
//       if (response) {
//         window.bracketsViewer.render({
//           stages: data.stage,
//           matches: data.match,
//           matchGames: data.match_game,
//           participants: data.participant,
//         });
//       }
//     } catch (error) {
//       alert(
//         "Failed to fetch data from localhost. Please make sure the server is running."
//       );
//       console.error(error);
//     }
//   }
//   useEffect(() => {
//     render();
//   }, []);
//   return <div className="brackets-viewer"></div>;
// };

// export default Viewer;
