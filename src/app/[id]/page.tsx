import Link from "next/link";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

import CopyToClipboard from "./copy-to-clipboard";

export default async function QuestionPage({params: {id}}: {params: {id: string}}) {
  const scSupabase = createServerComponentClient({
    cookies,
  });

  const question = await scSupabase
    .from("questions")
    .select()
    .eq("id", id)
    .single()
    .then(({data}) => data as {id: string; text: string});

  return (
    <article className="grid gap-4">
      <Link href="/">← Volver atrás</Link>
      <section>
        <h2 className="rounded-t-lg bg-pink-500 p-4 text-xl font-bold">Questioncy</h2>
        <h1 className="rounded-b-lg bg-white p-4 text-xl text-black">{question.text}</h1>
      </section>
      <CopyToClipboard />
    </article>
  );
}
