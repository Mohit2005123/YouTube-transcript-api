import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { YoutubeTranscript } from 'youtube-transcript';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
// POST endpoint to fetch transcript
app.post("/get-transcript", async (req, res) => {
  const { videoLink } = req.body;
  // Validate input
  if (!videoLink) {
    return res.status(400).json({ error: "Invalid YouTube link" });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoLink);
    return res.status(200).json({ transcript });
  } catch (error) {
    console.error("Error fetching transcript:", error.message);
    return res.status(500).json({ error: "Could not fetch transcript. The video might not have subtitles enabled." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});