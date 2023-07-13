import { PineconeClient } from "@pinecone-database/pinecone";

let pinecone: PineconeClient

pinecone = new PineconeClient();

pinecone.init({
  environment: `${process.env.PINECONE_ENV}`,
  apiKey: `${process.env.PINECONE_API_KEY}`,
});

export { pinecone }