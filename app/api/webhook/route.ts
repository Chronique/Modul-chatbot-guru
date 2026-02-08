import { NextResponse } from 'next/server';
import axios from 'axios';

const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.WHATSAPP_PHONE_ID;
const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;

// 1. WEBHOOK VERIFICATION (Required by Meta)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    return new NextResponse(challenge);
  }
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// 2. INCOMING MESSAGE HANDLER
export async function POST(req: Request) {
  const body = await req.json();

  if (body.object === 'whatsapp_business_account') {
    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    const contact = body.entry?.[0]?.changes?.[0]?.value?.contacts?.[0];

    if (message) {
      const senderNumber = message.from;
      const incomingText = message.text?.body || "";
      const senderName = contact?.profile?.name || "Student";

      console.log(`Received message from ${senderName}: ${incomingText}`);

      await processAgentLogic(senderNumber, incomingText, senderName);
    }
  }

  return NextResponse.json({ status: "success" });
}

// 3. AI AGENT LOGIC (ERC-8004 CONCEPT)
async function processAgentLogic(recipient: string, text: string, name: string) {
  const query = text.toLowerCase();
  let reply = "";

  // Scenario: Grade Check
  if (query.includes('grade') || query.includes('score') || query.includes('result')) {
    const mockScore = Math.floor(Math.random() * (100 - 70 + 1)) + 70;
    reply = `📊 *EXAMINATION REPORT*\n\n👤 Name: ${name}\n📝 Score: *${mockScore}/100*\n✅ Status: PASSED\n\n_Verified by AI Teacher Agent (ERC-8004)_`;
  } 
  // Scenario: Schedule Check
  else if (query.includes('schedule') || query.includes('class')) {
    reply = `📅 *TODAY'S SCHEDULE*\n\n08:00 AM - Mathematics\n10:00 AM - Physics\n01:00 PM - Lab Session`;
  }
  // Default Response
  else {
    reply = `Hello ${name}! 👋\nI am your AI Teaching Assistant.\n\nCommands:\n- *Grade* (Check exam results)\n- *Schedule* (View class timeline)`;
  }

  await sendWhatsAppMessage(recipient, reply);
}

// 4. META API INTEGRATION
async function sendWhatsAppMessage(to: string, text: string) {
  try {
    await axios.post(
      `https://graph.facebook.com/v17.0/${PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: to,
        text: { body: text }
      },
      {
        headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("WhatsApp API Error:", error);
  }
}