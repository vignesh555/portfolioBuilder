'use client'

import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast";
import { DataTable } from "../common/data-table";
import { columns } from "./columns";
import { ContactMeSchemaConvertedType } from "@/app/validationSchema/contactMe";
import { fetchContact } from "@/app/actions/contact";


const Contact = () => {
  const [tableData, setTableData] = useState<ContactMeSchemaConvertedType[] | []>([]);

  const getContact = useCallback(async () => {
    const { error, data, success } = await fetchContact();
    console.log("data", data);
    if (success && data) {
      if (data.length === 0) {
        setTableData([]);
      } else {
        setTableData(data);
      }
    } else {
      toast.error(error instanceof Error ? error.message : error);
    }
  }, [])

  useEffect(() => {
    getContact();
  }, [getContact]);

  return (
    <>
      <DataTable columns={columns} data={tableData} />
    </>
  )
}

export default Contact