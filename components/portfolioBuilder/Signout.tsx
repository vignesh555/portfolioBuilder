'use client';
import { useAuth } from "@clerk/nextjs"
import { useState } from "react";
import { Button } from "../ui/button";

function Signout() {
  const { signOut } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const signOutCallBack = async () => {
    setLoading(true);
    await signOut(() => {}, {
      redirectUrl: '/admin'
    })
    setLoading(false);
  }
  return (
    <div>
      <Button className="min-w-full" disabled={isLoading} onClick={signOutCallBack}>Sign Out</Button>
    </div>
  )
}

export default Signout