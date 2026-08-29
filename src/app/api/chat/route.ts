import { GoogleGenAI } from '@google/genai';

export const runtime = 'nodejs';

function getSmartChemicalKnowledgeResponse(query: string): string {
  const q = query.toLowerCase().trim();

  if (q.includes('hello') || q.includes('hey') || q.includes('hi') || q === 'hlo') {
    return `Namaste! 👋 Main **ChemQuest AI Tutor** hoon — aapke **BTER Diploma Chemical Engineering V Semester** ka personal study assistant! 🧪

Aap mujhse kisi bhi subject ke questions pooch sakte hain:
1. **Chemical Reaction Engineering (CRE - CH 5001)**: Arrhenius Law, CSTR vs PFR, RTD, Reaction Kinetics
2. **Mass Transfer-II (MT-II - CH 5002)**: Relative Volatility, McCabe-Thiele Method, q-line, Extraction
3. **Process Control & Instrumentation (PC&I - CH 5003)**: PID Controller, First Order System, Time Constant
4. **Energy Engineering (CH 50042)**: Coal Proximate/Ultimate Analysis, Combustion Air
5. **Safety in Chemical Plants (CH 50052)**: HAZOP Study, LEL/UEL, Confined Spaces

Bataiye aaj kis topic ka concept ya numerical samajhna chahte hain? 🎯`;
  }

  if (q.includes('volatility') || q.includes('relative')) {
    return `### 📌 Relative Volatility ($\alpha_{AB}$) — Mass Transfer-II (Unit 1)

**1. Definition:**
Relative Volatility $(\alpha_{AB})$ is the numerical ratio of the vapor-liquid equilibrium ratios of the More Volatile Component (MVC, $A$) to the Less Volatile Component (LVC, $B$).
$$\alpha_{AB} = \frac{y_A / x_A}{y_B / x_B} = \frac{y_A / (1 - y_A)}{x_A / (1 - x_A)}$$

**2. Vapor-Liquid Equilibrium (VLE) Equation:**
$$y = \frac{\alpha x}{1 + (\alpha - 1)x}$$

**3. Key Exam Insights (BTER & PSU):**
- If $\alpha > 1$: Separation by distillation is possible. Higher $\alpha$ means easier separation.
- If $\alpha = 1$: Vapor and liquid compositions are identical ($y = x$). An **azeotrope** is formed, and separation by simple distillation is **impossible**.
- **Ideal System (Raoult's Law):** $\alpha_{AB} = \frac{P_A^{\\text{sat}}}{P_B^{\\text{sat}}}$ (ratio of pure component vapor pressures).`;
  }

  if (q.includes('mccabe') || q.includes('thiele') || q.includes('q-line') || q.includes('reflux')) {
    return `### 📌 McCabe-Thiele Graphical Method — MT-II (Unit 2)

**1. Key Assumptions (Lewis Sorel Method):**
- Constant Molar Overflow (CMO) in both rectifying and stripping sections.
- Equimolar latent heats of vaporization.
- Negligible heat of mixing & adiabatic column (no heat loss).

**2. Governing Operating Lines:**
- **Rectifying Section (ROL):** 
  $$y_{n+1} = \frac{R}{R+1}x_n + \frac{x_D}{R+1}$$
  - Slope: $\frac{R}{R+1}$
  - y-intercept: $\frac{x_D}{R+1}$
  
- **Feed Condition ($q$-line):**
  $$y = \frac{q}{q-1}x - \frac{z_F}{q-1}$$
  - Saturated Liquid (Bubble point): $q = 1$ (Vertical line, slope $= \infty$)
  - Saturated Vapor (Dew point): $q = 0$ (Horizontal line, slope $= 0$)
  - Subcooled Liquid: $q > 1$ (Positive slope $> 1$)
  - Superheated Vapor: $q < 0$ (Positive slope $< 1$)
  - Liquid + Vapor Mix: $0 < q < 1$ (Negative slope)

- **Stripping Section (SOL):** Connects intersection point of ROL & $q$-line to $(x_B, x_B)$.

**3. Theoretical Stages Calculation:**
Step off triangular plates between the Equilibrium Curve and Operating Lines from $x_D$ down to $x_B$. Number of steps $= N_{\\text{theoretical}}$ (Total stages including reboiler).`;
  }

  if (q.includes('cstr') || q.includes('pfr') || q.includes('reactor') || q.includes('batch')) {
    return `### 📌 Reactor Design & Comparison (CRE — Unit 4 & 5)

**1. Ideal Reactor Performance Equations:**
- **Batch Reactor (Constant Volume):**
  $$t = C_{A0} \int_0^{X_A} \frac{dX_A}{-r_A}$$

- **CSTR (Continuous Stirred Tank Reactor / Mixed Flow):**
  $$V = \frac{F_{A0} \cdot X_A}{(-r_A)_{\\text{exit}}} = \frac{v_0 \cdot C_{A0} \cdot X_A}{(-r_A)_{\\text{exit}}}$$
  *Key Characteristic:* Operates at the lowest reactant concentration (exit concentration), hence reaction rate is lowest.

- **PFR (Plug Flow Reactor):**
  $$V = F_{A0} \int_0^{X_A} \frac{dX_A}{-r_A}$$

**2. Size Comparison for Same Conversion ($n > 0$):**
$$\frac{V_{\\text{CSTR}}}{V_{\\text{PFR}}} > 1$$
For any positive order reaction, **CSTR volume is always larger than PFR volume** for the same feed and conversion!`;
  }

  if (q.includes('arrhenius') || q.includes('activation') || q.includes('temperature dependency')) {
    return `### 📌 Arrhenius Equation & Temperature Dependency (CRE — Unit 2)

**1. Formula:**
$$k = A \cdot e^{-\\frac{E_a}{R T}}$$
Where:
- $k$ = Specific reaction rate constant
- $A$ = Pre-exponential frequency factor
- $E_a$ = Activation energy (J/mol or cal/mol)
- $R$ = Universal gas constant ($8.314\\text{ J/mol}\\cdot\\text{K}$)
- $T$ = Absolute temperature in Kelvin (K)

**2. Two-Temperature Form (Exam Solved Numerical):**
$$\\ln\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{R} \\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right) = \\frac{E_a}{R} \\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)$$

**3. Graphical Plot:**
Plot of $\\ln(k)$ vs $\\frac{1}{T}$ gives a straight line with:
- **Slope:** $-\\frac{E_a}{R}$
- **y-intercept:** $\\ln(A)$`;
  }

  if (q.includes('pid') || q.includes('controller') || q.includes('transfer function') || q.includes('time constant')) {
    return `### 📌 Process Control & Instrumentation (PC&I — CH 5003)

**1. Ideal PID Controller Transfer Function:**
$$G_c(s) = K_c \left(1 + \frac{1}{\tau_I s} + \tau_D s\right)$$
- **Proportional Action ($K_c$):** Gives rapid response but results in **Offset (Steady-state error)**.
- **Integral Action ($\tau_I$):** Eliminates offset completely but increases oscillatory tendency.
- **Derivative Action ($\tau_D$):** Anticipates future error, improves stability and reduces overshoot.

**2. First Order System Step Response:**
$$G(s) = \frac{K_p}{\tau s + 1} \implies y(t) = K_p \cdot \Delta U \left(1 - e^{-t/\tau}\right)$$
At $t = \tau$ (Time Constant), the output reaches **$63.2\%$** of its ultimate steady-state change.`;
  }

  if (q.includes('hazop') || q.includes('safety') || q.includes('lel') || q.includes('uel')) {
    return `### 📌 Safety in Chemical Plants (CH 50052)

**1. HAZOP (Hazard and Operability Study):**
A structured technique using **Guide Words + Process Parameters = Deviation**:
- *NO + FLOW* = No flow (e.g., pump tripped, closed valve).
- *MORE + TEMPERATURE* = Overheating (e.g., runaway reaction, cooling failure).
- *REVERSE + FLOW* = Backflow (e.g., check valve failure).

**2. Flammability Limits:**
- **LEL (Lower Explosive Limit):** Leanest vapor concentration in air that can ignite.
- **UEL (Upper Explosive Limit):** Richest vapor concentration that can support combustion.
- Range between LEL and UEL is the **Explosive / Flammable Zone**.`;
  }

  return `### 🎯 ChemQuest Study Guidance for: "${query}"

**BTER Chemical Engineering Core Highlights:**
1. **Syllabus Source:** Verified BTER 5th Semester syllabus and standard textbooks (Levenspiel, Treybal, Coughanowr).
2. **Key Concepts to Remember:**
   - Always state assumptions clearly (e.g., Constant Molar Overflow in McCabe-Thiele, Isothermal in Arrhenius).
   - Write governing equations with complete SI units.
   - Draw neat sketches (VLE diagram, Operating lines, Levenspiel plot, Control loop block diagram).

Aap is topic ke specific derivation ya numerical problem ke steps detail mein pooch sakte hain! 🚀`;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content || '';
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey.length > 15 && !apiKey.startsWith('AQ.')) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are ChemQuest AI, an expert Chemical Engineering tutor for BTER Diploma V Semester students. Provide clear, exam-focused explanations with LaTeX math formatting ($...$ and $$...$$), step-by-step numerical derivations, and Hinglish explanations when asked in Hindi.`;

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
              const fallback = getSmartChemicalKnowledgeResponse(lastMessage);
              controller.enqueue(new TextEncoder().encode(fallback));
              controller.close();
            }
          }
        });

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
          },
        });
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to smart knowledge base:', geminiError);
      }
    }

    // High-performance grounded fallback response
    const fallbackResponse = getSmartChemicalKnowledgeResponse(lastMessage);
    return new Response(fallbackResponse, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error: any) {
    console.error('Chat API general error:', error);
    const safeResponse = getSmartChemicalKnowledgeResponse('help');
    return new Response(safeResponse, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}
