const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.85,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "You are a chatbot, a friendly assistant who can answer questions and provide information regarding the diseases identified the Dr.Derm App. You should only answer questions related to the diseases identified by the app,for any other questions, give a suitable prompt saying you don't know" }],
      },
      {
        role: "user",
        parts: [{ text: "What diseases are identified by the app" }],
      },
      {
        role: "model",
        parts: [{ text: "Dr. Derm app can classify Melanoma , Warts Molluscum and other Viral Infections, Psoriasis pictures Lichen Planus and related diseases, Seborrheic Keratoses and other Benign Tumors, Tinea Ringworm Candidiasis and other Fungal Infections, Eczema and Atopic Dermatitis" }],
      },
      {
        role: "user",
        parts: [{ text: "Hi" }],
      },
      {
        role: "model",
        parts: [{ text: "Hi there! Do you have any questions about the diseases identified by the Dr.Derm App?" }],
      },
      {
        role: "user",
        parts: [{ text: "What causes melanoma?" }],
      },
      {
        role: "model",
        parts: [{ text: "Melanoma is caused by the uncontrolled growth of melanocytes, the cells that produce pigment in the skin. Excessive exposure to ultraviolet (UV) rays from sunlight or tanning beds increases the risk. Fair-skinned individuals, those with a family history of melanoma, and people with certain genetic mutations are at higher risk." }],
      },
      {
        role: "user",
        parts: [{ text: "How can I treat warts?" }],
      },
      {
        role: "model",
        parts: [{ text: "Warts are usually treated with over-the-counter salicylic acid or freezing treatments (cryotherapy). More stubborn warts may require laser treatment or minor surgery. In some cases, they can go away on their own, but treatment helps speed up the process." }],
      },
      {
        role: "user",
        parts: [{ text: "What are the symptoms of psoriasis?" }],
      },
      {
        role: "model",
        parts: [{ text: "Psoriasis typically presents as red patches of skin covered with thick, silvery scales. These patches can be itchy, painful, and may crack or bleed. It commonly affects areas like the scalp, elbows, knees, and lower back." }],
      },
      {
        role: "user",
        parts: [{ text: "Is molluscum contagious?" }],
      },
      {
        role: "model",
        parts: [{ text: "Yes, molluscum contagiosum is a viral infection that spreads through direct skin contact or contaminated objects like towels. It causes small, painless bumps on the skin, which may last for several months but often resolve on their own." }],
      },
      {
        role: "user",
        parts: [{ text: "What are the treatment options for seborrheic keratoses?" }],
      },
      {
        role: "model",
        parts: [{ text: "Seborrheic keratoses are generally harmless and don't need treatment unless for cosmetic reasons. If removal is desired, they can be treated with cryotherapy (freezing), curettage (scraping), or laser treatment." }],
      },
      {
        role: "user",
        parts: [{ text: "How do I know if I have ringworm?" }],
      },
      {
        role: "model",
        parts: [{ text: "Ringworm, also known as tinea, usually appears as a red, circular, itchy rash with a clear center and raised edges. It can occur on the scalp, body, feet (athlete's foot), or groin (jock itch). If you suspect ringworm, it's best to consult a doctor for diagnosis and antifungal treatment." }],
      },
      {
        role: "user",
        parts: [{ text: "Can candidiasis affect my skin?" }],
      },
      {
        role: "model",
        parts: [{ text: "Yes, candidiasis, or a yeast infection caused by the Candida species, can affect the skin, especially in moist areas like the groin, armpits, and under the breasts. It can cause red, itchy, and sometimes painful rashes. Antifungal creams or medications are commonly used to treat candidiasis." }],
      },
      {
        role: "user",
        parts: [{ text: "What's the difference between eczema and atopic dermatitis?" }],
      },
      {
        role: "model",
        parts: [{ text: "Eczema is a general term for several types of skin inflammation, while atopic dermatitis is the most common form of eczema. Atopic dermatitis usually starts in childhood and is associated with dry, itchy skin, and sometimes with asthma or hay fever. Moisturizers, avoiding irritants, and using prescription treatments can help manage the condition." }],
      },
      {
        role: "user",
        parts: [{ text: "How do I prevent atopic dermatitis flare-ups?" }],
      },
      {
        role: "model",
        parts: [{ text: "To prevent atopic dermatitis flare-ups, it's important to keep the skin well-moisturized with creams or ointments, avoid known irritants (like certain soaps or allergens), and manage stress. If flare-ups do occur, topical steroids or other prescription medications can help control inflammation." }],
      },
      {
        role: "user",
        parts: [{ text: "What is the best way to avoid fungal infections like ringworm?" }],
      },
      {
        role: "model",
        parts: [{ text: "To prevent fungal infections like ringworm, it's important to keep your skin clean and dry, avoid sharing personal items like towels or clothing, and wear breathable fabrics, especially in warm, humid environments. If you're prone to fungal infections, using antifungal powder or spray can also help." }],
      },
      {
        role: "user",
        parts: [{ text: "What are the risk factors for melanoma?" }],
      },
      {
        role: "model",
        parts: [{ text: "The primary risk factor for melanoma is excessive exposure to ultraviolet (UV) light from the sun or tanning beds. Other risk factors include having fair skin, a history of sunburns, many moles or unusual moles, a family history of melanoma, and a weakened immune system." }],
      },
      {
        role: "user",
        parts: [{ text: "How can I prevent warts from spreading?" }],
      },
      {
        role: "model",
        parts: [{ text: "To prevent warts from spreading, avoid picking at the warts and keep them covered with a bandage. Don’t share personal items like towels, razors, or shoes. If the wart is on your foot, wear sandals in communal showers or pool areas to avoid spreading the virus to others." }],
      },
      {
        role: "user",
        parts: [{ text: "What triggers psoriasis flare-ups?" }],
      },
      {
        role: "model",
        parts: [{ text: "Psoriasis flare-ups can be triggered by stress, infections (like strep throat), skin injuries, dry weather, smoking, excessive alcohol consumption, and certain medications, including beta-blockers and lithium. Keeping skin moisturized and managing stress can help reduce flare-ups." }],
      },
      {
        role: "user",
        parts: [{ text: "Is lichen planus contagious?" }],
      },
      {
        role: "model",
        parts: [{ text: "No, lichen planus is not contagious. It is an inflammatory condition that affects the skin and mucous membranes, but it is not spread through contact. Its exact cause is unknown, but it is believed to be related to an overactive immune response." }],
      },
      {
        role: "user",
        parts: [{ text: "What causes seborrheic keratoses?" }],
      },
      {
        role: "model",
        parts: [{ text: "The exact cause of seborrheic keratoses is unknown, but they tend to appear more frequently as people age. They are not caused by sun exposure or viruses, and they are benign, meaning they don’t turn into skin cancer." }],
      },
      {
        role: "user",
        parts: [{ text: "How do fungal infections like tinea spread?" }],
      },
      {
        role: "model",
        parts: [{ text: "Fungal infections like tinea (ringworm) spread through direct contact with an infected person or animal, or by touching contaminated objects, such as towels, clothing, or surfaces in communal areas like locker rooms. It thrives in warm, moist environments, so it's important to keep your skin dry and clean." }],
      },
      {
        role: "user",
        parts: [{ text: "Can candidiasis be caused by antibiotics?" }],
      },
      {
        role: "model",
        parts: [{ text: "Yes, antibiotics can cause candidiasis. When you take antibiotics, they can disrupt the natural balance of bacteria in your body, which allows Candida yeast to grow out of control, leading to a yeast infection. This is why candidiasis can sometimes occur after a course of antibiotics." }],
      },
      {
        role: "user",
        parts: [{ text: "What’s the best way to manage eczema in children?" }],
      },
      {
        role: "model",
        parts: [{ text: "To manage eczema in children, it's important to keep their skin moisturized with thick creams or ointments. Avoid harsh soaps and known triggers like allergens or scratchy fabrics. Keeping their nails trimmed can prevent them from scratching, and in severe cases, a doctor may prescribe topical steroids to control inflammation." }],
      },
      {
        role: "user",
        parts: [{ text: "What foods should I avoid if I have atopic dermatitis?" }],
      },
      {
        role: "model",
        parts: [{ text: "Certain foods can trigger atopic dermatitis flare-ups, especially in people who have food allergies. Common culprits include dairy, eggs, nuts, soy, and gluten. It’s a good idea to identify and avoid any foods that seem to worsen symptoms, but consult with a healthcare provider before making major dietary changes." }],
      }
    ]
    
  });

  const result = await chat.sendMessage(userInput);
  const response = await result.response;
  return response.text();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
