import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {ImageResponse} from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Questioncy";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const rhSupabase = createRouteHandlerClient({cookies});

// Image generation
export default async function Image({params: {id}}: {params: {id: string}}) {
  const question = await rhSupabase
    .from("questions")
    .select()
    .eq("id", id)
    .single()
    .then(({data}) => data as {id: string; text: string});

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          fontSize: 64,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            backgroundColor: "hotpink",
            width: "100%",
            color: "white",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Questioncy</p>
        </div>
        <div style={{margin: "auto"}}>{question.text}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
