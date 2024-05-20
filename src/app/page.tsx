"use client";

import Hero from "@/app/components/Hero";

export default function Home() {

    // const { suiClient } = useSui();
    // const [loginUrl, setLoginUrl] = useState<string | null>();

    // async function prepareLogin() {
    //     const { epoch, epochDurationMs, epochStartTimestampMs } = await suiClient.getLatestSuiSystemState();


    //     const maxEpoch = parseInt(epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
    //     const ephemeralKeyPair: Keypair = new Ed25519Keypair();
    //     const ephemeralPrivateKeyB64 = ephemeralKeyPair.export().privateKey;


    //     const ephemeralPublicKey: PublicKey = ephemeralKeyPair.getPublicKey()
    //     const ephemeralPublicKeyB64 = ephemeralPublicKey.toBase64();

    //     const jwt_randomness = generateRandomness();
    //     const nonce = generateNonce(ephemeralPublicKey, maxEpoch, jwt_randomness);

    //     console.log("current epoch = " + epoch);
    //     console.log("maxEpoch = " + maxEpoch);
    //     console.log("jwt_randomness = " + jwt_randomness);
    //     console.log("ephemeral public key = " + ephemeralPublicKeyB64);
    //     console.log("nonce = " + nonce);

    //     const userKeyData: UserKeyData = {
    //         randomness: jwt_randomness.toString(),
    //         nonce: nonce,
    //         ephemeralPublicKey: ephemeralPublicKeyB64,
    //         ephemeralPrivateKey: ephemeralPrivateKeyB64,
    //         maxEpoch: maxEpoch
    //     }
    //     localStorage.setItem("userKeyData", JSON.stringify(userKeyData));
    //     return userKeyData
    // }


    // function getRedirectUri() {
    //     const protocol = window.location.protocol;
    //     const host = window.location.host;
    //     const customRedirectUri = protocol + "//" + host + "/auth";
    //     console.log("customRedirectUri = " + customRedirectUri);
    //     return customRedirectUri;
    // }

    // useLayoutEffect(() => {

    //     prepareLogin().then((userKeyData) => {

    //         const REDIRECT_URI = 'https://zklogin-dev-redirect.vercel.app/api/auth';
    //         const customRedirectUri = getRedirectUri();
    //         const params = new URLSearchParams({
    //             // When using the provided test client ID + redirect site, the redirect_uri needs to be provided in the state.
    //             state: new URLSearchParams({
    //                 redirect_uri: customRedirectUri
    //             }).toString(),
    //             // Test Client ID for devnet / testnet:
    //             client_id: '595966210064-3nnnqvmaelqnqsmq448kv05po362smt2.apps.googleusercontent.com',
    //             redirect_uri: REDIRECT_URI,
    //             response_type: 'id_token',
    //             scope: 'openid',
    //             nonce: userKeyData.nonce,
    //         });

    //         setLoginUrl(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
    //     });


    // }, []);


    return (
        <div>
            <Hero />
        </div>

    );
}
