import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import fs from "fs";

// 1. Initialize Global SDK Clients
const neynar = new NeynarAPIClient({ 
  apiKey: process.env.NEYNAR_API_KEY || "" 
});

const coinbase = new Coinbase({
  apiKeyName: process.env.CDP_API_KEY_NAME!,
  privateKey: process.env.CDP_API_KEY_PRIVATE_VALUE?.replace(/\\n/g, '\n')!,
});

export async function POST(req: Request) {
  try {
    const WALLET_DATA_FILE = "wallet_data.json";
    let wallet;

    // 2. Wallet Persistence Logic (Maintain Agent Identity)
    if (fs.existsSync(WALLET_DATA_FILE)) {
      const savedData = JSON.parse(fs.readFileSync(WALLET_DATA_FILE, "utf8"));
      wallet = await Wallet.import(savedData); 
      console.log("Wallet loaded from local file.");
    } else {
      wallet = await Wallet.create({ networkId: "base-sepolia" });
      const walletData = await wallet.export(); 
      fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(walletData));
      console.log("New wallet created and saved locally.");
    }

    const agentAddress = await wallet.getDefaultAddress();
    console.log(`Agent Wallet Address: ${agentAddress}`);

    // 3. Define Smart Contract ABI
    const abi = [{
        "inputs": [{ "internalType": "uint256", "name": "_agentId", "type": "uint256" }],
        "name": "validateGradingTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }];

    // 4. On-chain Interaction (Base Sepolia)
    console.log("Invoking contract...");
    const contractInvocation = await wallet.invokeContract({
      contractAddress: "0xf28a424047AEe0EF8f8fA80c5eEdA7b86e4e5e83",
      method: "validateGradingTask",
      args: { "_agentId": "0" }, // ID 0 for the first agent
      abi: abi 
    });

    // 5. Wait for Confirmation
    const result = await contractInvocation.wait();
    const txHash = result.getTransactionHash();
    console.log(`Success! Tx Hash: ${txHash}`);

    // 6. Autonomous Proof on Farcaster with Direct URL
    const signerUuid = (process.env.SIGNER_UUID || "").trim();
    if (signerUuid) {
      try {
        const castResponse = await neynar.publishCast({
          signerUuid: signerUuid,
          text: `🤖 EduAgent Progress: \n\nI have autonomously verified a grading task on Base Sepolia! \n\nView Tx: https://sepolia.basescan.org/tx/${txHash}` 
        });
        
        // FIX: Access the hash through the 'cast' object
        const castHash = castResponse.cast.hash; 
        console.log(`✅ Cast published! View here: https://warpcast.com/~/conversations/${castHash}`);
      } catch (neynarError: any) {
        console.error("Neynar Post Failed:", neynarError.response?.data || neynarError.message);
      }
    }

    return Response.json({ 
      status: "Success", 
      transaction: txHash, 
      address: agentAddress 
    });

  } catch (error: any) {
    console.error("Agent Execution Error:", error.apiMessage || error.message || error);
    return Response.json({ 
      error: "Agent failed to execute", 
      details: error.apiMessage || error.message 
    }, { status: 500 });
  }
}