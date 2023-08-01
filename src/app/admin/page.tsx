import {createServerActionClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";

export default async function AdminPage() {
  const scSupabase = createServerComponentClient({cookies});

  const questions = await scSupabase
    .from("questions")
    .select()
    .then(({data}) => data as {id: number; text: string; accepted: boolean}[]);

  async function removeAction(formData: FormData) {
    "use server";

    const saSupabase = createServerActionClient({cookies});

    await saSupabase
      .from("questions")
      .delete()
      .eq("id", Number(formData.get("id") as string));

    revalidatePath("/admin");
  }

  async function acceptAction(formData: FormData) {
    "use server";

    const saSupabase = createServerActionClient({cookies});

    await saSupabase
      .from("questions")
      .update({accepted: true})
      .eq("id", Number(formData.get("id") as string));

    revalidatePath("/admin");
  }

  return (
    <div className="grid gap-12">
      {questions.length ? (
        <article className="grid grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-4">
          {questions.map(({text: question, id, accepted}) => (
            <div key={question}>
              <h2
                className={`flex items-center justify-between rounded-t-lg p-4 text-xl font-bold ${
                  accepted ? `bg-green-500` : `bg-orange-500`
                }`}
              >
                <span>Questioncy</span>
                <div className="flex items-center gap-4">
                  <form action={removeAction}>
                    <input name="id" type="hidden" value={id} />
                    <button className="text-3xl leading-none" type="submit">
                      ×
                    </button>
                  </form>
                  <form action={acceptAction}>
                    <input name="id" type="hidden" value={id} />
                    <button type="submit">✓</button>
                  </form>
                </div>
              </h2>
              <h1 className="rounded-b-lg bg-white p-4 text-xl text-black">{question}</h1>
            </div>
          ))}
        </article>
      ) : (
        <p className="text-center opacity-50">No hay preguntas.</p>
      )}
    </div>
  );
}
