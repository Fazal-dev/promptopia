import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// Get all prompts based on creator ID
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    // get all prompts for the creator
    const prompts = await Prompt.find({ creator: params.creatorId }).populate(
      "creator"
    );
    // check for prompts
    if (!prompts.length) {
      return new Response("No prompts found for this creator", { status: 404 });
    }
    // send to client
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
