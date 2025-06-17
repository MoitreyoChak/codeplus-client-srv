"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Home() {
  const session = useSession();
  const router = useRouter();

  const showSession = () => {
    if (session.status === "authenticated") {
      return (
        <>
          <button
            className="border border-solid border-black rounded"
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                window.location.href = "/signin";
                // router.push("/auth/signin");
                // router.reload();
              });
            }}
          >
            Sign Out
          </button>
          <div>{JSON.stringify(session)}</div>
        </>
      );
    } else if (session.status === "loading") {
      return <span className="text-[#888] text-sm mt-7">Loading...</span>;
    } else {
      return (
        <Link
          href="/auth/signin"
          className="border border-solid border-black rounded"
        >
          Sign In
        </Link>
      );
    }
  };

  return <div>{showSession()}</div>;
}

export default Home;
