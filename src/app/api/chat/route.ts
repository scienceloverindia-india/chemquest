import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    const lastMessage = messages[messages.length - 1]?.content || '';

    if (!apiKey) {
      // Smart offline fallback for key chemical engineering topics
      let fallbackText = "⚠️ **Note:** `GEMINI_API_KEY` is not yet set in `.env.local` or Vercel Environment Variables. Here is a quick answer from ChemQuest Knowledge Base:\n\n";

      const q = lastMessage.toLowerCase();
      if (q.includes('volatility') || q.includes('relative')) {
        fallbackText += "### Relative Volatility ($\\alpha$)\nRelative volatility is a measure of the ease of separation of two components in distillation:\n$$\\alpha_{AB} = \\frac{y_A / x_A}{y_B / x_B}$$\nEquilibrium relation:\n$$y = \\frac{\\alpha x}{1 + (\\alpha - 1)x}$$\n- If $\\alpha > 1$: MVC separates overhead.\n- If $\\alpha = 1$: Separation impossible (Azeotrope).";
      } else if (q.includes('mccabe') || q.includes('thiele') || q.includes('q-line')) {
        fallbackText += "### McCabe-Thiele Method\nGraphical method to calculate theoretical stages in distillation columns.\n- **q-line equation:** $y = \\frac{q}{q-1}x - \\frac{x_F}{q-1}$\n- **ROL:** $y_{n+1} = \\frac{R}{R+1}x_n + \\frac{x_D}{R+1}$\n- **SOL:** $y_{m+1} = \\frac{\\bar{L}}{\\bar{V}}x_m - \\frac{B}{\\bar{V}}x_B$\nAssumptions: Constant molar overflow, equimolar heats of vaporization, adiabatic.";
      } else if (q.includes('cstr') || q.includes('pfr') || q.includes('reactor')) {
        fallbackText += "### CSTR vs PFR\n- **CSTR (Continuous Stirred Tank Reactor):** $V = \\frac{F_{A0} X_A}{-r_A}$ — completely mixed, lowest conversion per unit volume for positive orders.\n- **PFR (Plug Flow Reactor):** $V = F_{A0} \\int_0^{X_A} \\frac{dX_A}{-r_A}$ — no axial mixing, highest conversion per unit volume.";
      } else if (q.includes('hazop') || q.includes('safety')) {
        fallbackText += "### HAZOP (Hazard and Operability Study)\nA systematic qualitative technique using guide words (NO, MORE, LESS, AS WELL AS, PART OF, REVERSE, OTHER THAN) combined with process parameters (Flow, Temperature, Pressure) to identify potential safety hazards and operating problems.";
      } else {
        fallbackText += `You asked: **"${lastMessage}"**\n\nTo get full real-time AI explanations with step-by-step numerical derivations, please add your free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey) into \`.env.local\` as:\n\`\`\`\nGEMINI_API_KEY=AIzaSy...\n\`\`\``;
      }

      return new Response(fallbackText, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are ChemQuest AI, a Chemical Engineering tutor for BTER Diploma V Semester students. 
You specialize in CRE, Mass Transfer-II, Process Control, Energy Engineering, Safety, and Economics. 
Answer in simple Hindi-English mix (Hinglish) when the student asks in Hindi. 
Give exam-focused answers. Reference BTER syllabus topics. 
For numericals, show step-by-step solutions. 
Key formulas: Arrhenius equation, Relative volatility y=ax/(1+(a-1)x), Rayleigh equation, McCabe-Thiele method, PID controller equation, Freundlich isotherm.`;

    const formattedMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    formattedMessages.unshift({
      role: 'user',
      parts: [{ text: `SYSTEM INSTRUCTION: ${systemPrompt}` }]
    });

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents: formattedMessages,
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) {
              controller.enqueue(new TextEncoder().encode(text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
