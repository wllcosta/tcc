import "dotenv/config";

async function checkAvailableModels() {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    console.error("GOOGLE_API_KEY is missing in your .env file.");
    return;
  }

  console.log("🔍 Fetching available models for your API Key...\n");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
    );
    const data = await response.json();

    if (data.models) {
      const validModels = data.models
        .filter((model) =>
          model.supportedGenerationMethods.includes("generateContent"),
        )
        .map((model) => ({
          ModelName: model.name.replace("models/", ""),
          Version: model.version,
        }));

      console.table(validModels);
      console.log(
        "\nCopy one of the names from the 'ModelName' column and use it in your server/generate.js",
      );
    } else {
      console.error("Unexpected response:", data);
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}

checkAvailableModels();
