export const config = {
  runtime: "edge",
};

export default async function handler() {
  return new Response("Invalid image", { status: 400 });
}
