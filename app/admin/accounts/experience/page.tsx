'use client'

import { useCallback, useEffect, useRef, useState } from "react"
import userGlobalStore, { IuserGlobalStore } from "@/app/global-store/user-store";
import toast from "react-hot-toast";
import { deleteExperienceParticularId, fetchExperience } from "@/app/actions/experience";
import { DataTable } from "../common/data-table";
import { columns } from "./columns";
import { IExperienceResponse } from "@/app/interfaces";
import CreateExperience from "@/components/portfolioBuilder/CreateExperience";

interface CreateExperienceRef {
    populateTheForm: (row: IExperienceResponse) => void;
  }

const Experience = () => {
  const [tableData, setTableData] = useState<IExperienceResponse[] | []>([]);
  const { user } = userGlobalStore() as IuserGlobalStore;
  
  const childRef = useRef<CreateExperienceRef>(null);

  const getExperience = useCallback(async () => {
    if (user && user.id) {
      const { error, data, success } = await fetchExperience(user.id);
      if (success && data) {
        if (data.length === 0) {
          setTableData([]);
        } else {
          setTableData(data);
        }
      } else {
        toast.error(error instanceof Error ? error.message : error);
      }
    }
  }, [user])

  useEffect(() => {
    getExperience();
  }, [getExperience]);

  const handleEditExperience = (row: IExperienceResponse) => {
    childRef.current?.populateTheForm(row);
  }

  const handleDeleteExperience = async (row: IExperienceResponse) => {
    try {
      const { success } = await deleteExperienceParticularId(row.id);
      if (success) {
        toast.success("Experience deleted successfully");
        getExperience();
      } else {
        toast.error("Failed to delete experience. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast.error("Failed to delete experience. Please try again.");
      return;
      
    }
    
  }

  return (
    <>
      <DataTable columns={columns(handleEditExperience, handleDeleteExperience)} data={tableData} />
      <CreateExperience getExperience={getExperience} ref={childRef} />
    </>
  )
}

export default Experience