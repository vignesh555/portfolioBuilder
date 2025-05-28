'use client'
import userGlobalStore, { IuserGlobalStore } from "@/app/global-store/user-store";

function Account() {
  const { user } = userGlobalStore() as IuserGlobalStore;
  return (
    <div className="flex flex-col gap-5 p-5">
        Account
        <p>User: {user?.id}</p>
        <p>First Name: {user?.full_name}</p>
        <p>eMail: {user?.email}</p>
    </div>
  )
}

export default Account