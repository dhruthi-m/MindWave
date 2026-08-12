import ollama from "../config/ollama.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    console.log("Sending request to Ollama...");

    const response = await ollama.post(
      "/api/generate",
      {
        model: "gemma3:4b",
        prompt: message,
        stream: false,
      },
      {
        timeout: 60000,
      }
    );

    console.log("Ollama responded successfully");

    return res.json({
      success: true,
      reply: response.data.response,
    });
  } catch (error) {
    console.error("========== OLLAMA ERROR ==========");
    console.error(error.code);
    console.error(error.message);
    console.error(error.response?.data);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};