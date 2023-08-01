import {createServerActionClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export default async function AdminLayout({children}: {children: JSX.Element}) {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: {session},
  } = await supabase.auth.getSession();

  async function handleLogin(formData: FormData) {
    "use server";

    const saSupabase = createServerActionClient({cookies});

    await saSupabase.auth.signInWithPassword({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  }

  return session ? (
    children
  ) : (
    <form action={handleLogin}>
      <h2 className="rounded-t-lg bg-pink-500 p-4 text-xl font-bold">Questioncy</h2>
      <input
        className="w-full bg-white p-4 text-xl text-black"
        name="email"
        placeholder="some@email.com"
      />
      <input
        className="w-full rounded-b-lg bg-white p-4 text-xl text-black"
        name="password"
        placeholder="******"
        type="password"
      />
      <button
        className="mt-4 w-full rounded-lg bg-pink-500 p-4 text-lg font-medium text-white transition-colors hover:bg-pink-600"
        type="submit"
      >
        Iniciar sesión
      </button>
    </form>
  );
}
