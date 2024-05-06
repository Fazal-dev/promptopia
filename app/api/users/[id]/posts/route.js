import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    // get the prompts
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    // send to client
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all post", { status: 500 });
  }
};
