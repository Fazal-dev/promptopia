import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    // get the prompts
    const prompts = await Prompt.find({}).populate("creator");
    // send to client
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all post", { status: 500 });
  }
};
