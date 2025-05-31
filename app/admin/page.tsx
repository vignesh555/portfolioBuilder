import { Suspense } from "react";
import AdminWrapper from "./AdminWrapper";

const Admin = () => {
  return (<Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
    <AdminWrapper />
  </Suspense>)
}

export default Admin