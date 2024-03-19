import { useState } from "react";

type WalletResponse = {
  connectedStatus: boolean;
  status: string;
  address?: string;
};

export function SmartWallet() {
  const [isConnected, setConnectedStatus] = useState(false);
  const [status, setStatus] = useState("");
  const [walletAddress, setWallet] = useState("");

  const connectWalletPressed = async () => {
    if (isConnected) {
      return alert(
        "Account already connected! " +
        String(walletAddress).substring(0, 5) +
        "..." +
        String(walletAddress).substring(38)
      );
    }

    const walletResponse = await connectWallet();
    setConnectedStatus(walletResponse.connectedStatus);
    setStatus(walletResponse.status);
    setWallet(walletResponse.address || "");
  };

  const connectWallet = async (): Promise<WalletResponse> => {
    if (window.ethereum) {
      try {
        const address = await window.ethereum.enable();
        const obj: WalletResponse = {
          connectedStatus: true,
          status: "Conectado",
          address: address[0], // Pode acessar o primeiro endereço retornado, se houver
        };
        return obj;
      } catch (error) {
        return {
          connectedStatus: false,
          status: "Error while connecting to account",
        };
      }
    } else {
      return {
        connectedStatus: false,
        status:
          "Install Metamask in your browser: https://metamask.io/download.html",
      };
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <span className="text-sm text-txt-00">Wallet Address</span>
        <span className="text-sm text-txt-00">{walletAddress}</span>
      </div>
      <button
        onClick={connectWalletPressed}
        className="flex items-center text-sm h-10 border-none bg-cl-light-success active:bg-cl-dark-success text-txt-00 rounded-lg p-3"
      >
        {status ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
    </>
  );
}
