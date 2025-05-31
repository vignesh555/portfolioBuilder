'use client';
import { SignIn, SignUp, useUser } from "@clerk/nextjs"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AdminWrapper = () => {
  const { user } = useUser()
  const route = useRouter()
  const searchParams = useSearchParams();
  const formType = searchParams.get('formType');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      route.push('/admin/accounts')
    };
    setLoading(false);
  }, [user, route]);

  if (isLoading) {
    return (<div>Loading...</div>)
  }

  return (<div className="flex justify-center items-center min-h-screen">
    {formType === 'sign-in' ? 
        <SignIn routing="hash" signUpUrl="/admin?formType=sign-up" fallbackRedirectUrl="/admin/accounts" /> :
        <SignUp routing="hash" signInUrl="/admin?formType=sign-in" fallbackRedirectUrl="/admin/accounts" />
      }
  </div>)
}

export default AdminWrapper