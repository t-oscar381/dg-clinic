"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/dgc-master/login");
    router.refresh();
  };

  return (
    <button type="button" className="btn btn-ghost btn-sm" onClick={signOut}>
      Sign Out
    </button>
  );
}
