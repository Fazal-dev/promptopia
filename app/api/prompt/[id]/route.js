import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// get
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    // get the prompts
    const prompt = await Prompt.findById(params.id).populate("creator");
    // check for prompt
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    // send to client
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch post", { status: 500 });
  }
};

// update
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    // send to client
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update post", { status: 500 });
  }
};
// delete
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response(JSON.stringify("Prompt deleted succesfully"), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to delete post", { status: 500 });
  }
};
