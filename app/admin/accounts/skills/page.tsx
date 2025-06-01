'use client'

import { useCallback, useEffect, useRef, useState } from "react"
import userGlobalStore, { IuserGlobalStore } from "@/app/global-store/user-store";
import toast from "react-hot-toast";
import { deleteSkillsParticularId, fetchSkills } from "@/app/actions/skills";
import { getColumns } from "./columns";
import { ISkillsResponse } from "@/app/interfaces";
import CreateSkills from "@/components/portfolioBuilder/CreateSkills";
import { DataTable } from "../common/data-table";

 type CreateSkillsRef = {
    populateTheForm: (row: ISkillsResponse) => void;
  };

const Skills = () => {
  const [tableData, setTableData] = useState<ISkillsResponse[] | []>([]);
  const { user } = userGlobalStore() as IuserGlobalStore;
 
  const childRef = useRef<CreateSkillsRef>(null);

  const getSkills = useCallback(async () => {
    if (user && user.id) {
      const { error, data, success } = await fetchSkills(user.id);
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
    getSkills();
  }, [getSkills]);

  const handleEditSkills = (row: ISkillsResponse) => {
    childRef.current?.populateTheForm(row);
  }

  const handleDeleteSkills = async (row: ISkillsResponse) => {
    try {
      const { success } = await deleteSkillsParticularId(row.id);
      console.log("Delete experience", success)
      if (success) {
        toast.success("Skills deleted successfully");
        getSkills();
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
      <DataTable columns={getColumns({ onEdit: handleEditSkills, onDelete: handleDeleteSkills })} data={tableData} />
      <CreateSkills getSkills={getSkills} ref={childRef} />
    </>
  )
}

export default Skills