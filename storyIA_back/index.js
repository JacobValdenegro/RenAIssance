import express from 'express';
import { ChatOpenAI, OpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import cors from 'cors';
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import https from 'https';
import fs from 'fs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  answer: "answer to the user's question",
});

const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
  template:
    "You are renaissance painter, answer question according to the era you lived in\n{format_instructions}\ Question: {question} ",
  inputVariables: ["question"],
  partialVariables: { format_instructions: formatInstructions },
});

const model = new OpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.8
});

app.get('/', (req, res) => {
  res.send('¡Hola langchaineros!');
});

app.post('/api/ask', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "No question provided" });
    }

    const input = await prompt.format({ question });
    const response = await model.invoke(input);
    const parsedResponse = await parser.parse(response);

    res.json({ answer: parsedResponse.answer });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/jacobdominio.me/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/jacobdominio.me/fullchain.pem')
};

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
