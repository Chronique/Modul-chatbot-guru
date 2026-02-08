# 🎓 EduAgent: The First Trustless AI Teacher on Base

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Base](https://img.shields.io/badge/Base-Sepolia-blue) ![WhatsApp](https://img.shields.io/badge/WhatsApp-Cloud%20API-green) ![Status](https://img.shields.io/badge/Status-Hackathon%20MVP-orange)

**EduAgent** transforms the traditional classroom by combining **Generative AI** with **Blockchain Verification**. It is an autonomous AI Agent accessible via WhatsApp that grades exams, tracks student progress, and issues **verifiable onchain certificates (SBTs)** upon graduation.

---

## 💡 The Problem
1.  **Accessibility:** Learning Management Systems (LMS) are often complex and require desktops.
2.  **Trust:** How do we verify if an AI graded an exam correctly?
3.  **Ownership:** Student records are stuck in centralized school servers.

## 🚀 The Solution
**EduAgent** lives where students are: **WhatsApp**. 
* It acts as an **Autonomous Teacher** (grading, scheduling, answering).
* It utilizes **ERC-8004 (Trustless Agent)** concepts to build an onchain reputation for grading accuracy.
* It mints **Soulbound Tokens (NFTs)** on **Base** for students who pass exams.

---

## ⚙️ Architecture

```mermaid
graph TD
    User[Student / Teacher] --WhatsApp--> MetaAPI
    MetaAPI --Webhook--> NextJS[Next.js Server (Vercel)]
    NextJS --Prompt--> AI[LLM Engine]
    NextJS --Minting--> Base[Base Blockchain]
    Base --Reputation--> SmartContract[Agent Registry (ERC-8004)]


---

## Key Features

##🤖 AI Grading Agent: Automatically scans, analyzes, and scores student answers via WhatsApp.

## 🔗 Onchain Certification: Issues a tamper-proof NFT (Sertifikat) to the student's wallet upon passing (Score > 70).

## 🛡️ Verifiable Agent Identity: Uses contracts/AITeacherAgent.sol to register the AI bot on-chain, proving its identity and track record.

## 📱 Zero-Friction UI: No app install required. Everything happens in the chat app.

## 🛠️ Tech Stack


*Framework:* Next.js 14 (App Router)

*Language:* TypeScript

*Interface:* WhatsApp Cloud API (Meta)

*Blockchain:* Base (Ethereum L2)

*Smart Contracts:* Solidity (Experimental ERC-8004 Logic)

## 📂 Smart Contract Logic (The "Onchain" Part)
Located in /contracts/AITeacherAgent.sol.

We are implementing the Trustless Agent Standard. The AI Teacher is not just a server script; it is an entity on the blockchain.

Registration: The Agent is initialized on Base.

Reputation: Every time the Agent grades an exam, it pushes a validation hash to the chain, increasing its "Trust Score".

---

⚡ **Getting Started**
1. *Clone the Repo*
```Bash
git clone [https://github.com/yourusername/eduagent-base.git](https://github.com/yourusername/eduagent-base.git)
```
cd eduagent-base

2. *Install Dependencies*
```Bash
npm install
```
3. *Environment Variables*
Create a .env.local file:


WHATSAPP_TOKEN=your_meta_token
WHATSAPP_PHONE_ID=your_phone_id
WEBHOOK_VERIFY_TOKEN=your_custom_password

4. *Run Locally*
```Bash
npm run dev
```

5. *Deploy Contracts*
(Optional - for Onchain testing)

```Bash
npx hardhat run scripts/deploy.js --network base-sepolia
```

### 🔮 Future Roadmap
Farcaster Integration: Allow students to login via Warpcast/Farcaster Frames.

Crypto Payments: Teachers can set exam fees in USDC (Base).

DAO Governance: Top-performing students can vote on school curriculum.