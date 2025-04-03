import { useSignPersonalMessage } from "@mysten/dapp-kit";
import { useCallback } from "react";
import { ConnectButton } from "@mysten/dapp-kit";
import {verifyPersonalMessageSignature} from '@mysten/sui/verify';


export default function Home() {
  const { mutateAsync: signPersonalMessage } = useSignPersonalMessage();

  const sign = useCallback(async () => {
    try {
      const message = 'navi:sui:6689908414130633829';
      const encodedMessage = new TextEncoder().encode(message);
      const signResponse = await signPersonalMessage({
        message: encodedMessage
      });
      const verfyResult = await verifyPersonalMessageSignature(encodedMessage, signResponse.signature)
      console.log(verfyResult)
      alert(`verify success: ${verfyResult.toSuiAddress()}`)
    } catch (e: any) {
      alert(e.message || e)
    }   
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black/80 gap-5">
      <ConnectButton></ConnectButton>
      <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={sign}>
          Sign Message
        </button>
    </div>
  );
}
