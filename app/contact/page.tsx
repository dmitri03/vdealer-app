/*"use client";
//to access the session in a client component we use useSession
import { useSession } from "next-auth/react";
//we can also redirect to a different page if the user is not signed in
import { redirect } from "next/navigation";

export default function Contact() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <h2>Contact</h2>
      <h3>User: {session?.user?.name}</h3>
      <p>Email: {session?.user?.email}</p>
      <img src={session?.user?.image ?? ""} alt="User Avatar" />
    </div>
  );
}*/

"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <h2>Contact</h2>
      <h3>User: {session?.user?.name}</h3>
      <p>Email: {session?.user?.email}</p>
    </div>
  );
}
