/*"use client";
//get the session, signin and signout
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <nav className="flex justify-between p-4">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      {session ? (
        <button onClick={() => signOut()}>Sign Out {session.user?.name}</button>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </nav>
  );
}*/

"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <div className="text-xl font-bold">VDealer</div>

      {session ? (
        <div className="flex items-center gap-4">
          <p>{session.user?.name}</p>
          <img src={session.user?.image ?? ""} alt="User" className="w-8 h-8 rounded-full" />
          <button onClick={() => signOut()} className="text-sm text-red-500">
            Sign Out
          </button>
        </div>
      ) : (
        <button onClick={() => signIn("google")} className="text-sm text-blue-500">
          Sign In with Google
        </button>
      )}
    </nav>
  );
}
