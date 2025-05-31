'use client'

import { useCallback, useEffect, useRef, useState } from "react"
import userGlobalStore, { IuserGlobalStore } from "@/app/global-store/user-store";
import toast from "react-hot-toast";
import { deleteProjectParticularId, fetchProject } from "@/app/actions/project";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";
import { IProjectResponse } from "@/app/interfaces";
import CreateProject from "@/components/portfolioBuilder/CreateProject";


interface CreateProjectRef {
  populateTheForm: (row: IProjectResponse) => void;
}

const Project = () => {
  const [tableData, setTableData] = useState<IProjectResponse[] | []>([]);
  const { user } = userGlobalStore() as IuserGlobalStore;
  const childRef = useRef<CreateProjectRef>(null);

  const getProject = useCallback(async () => {
    if (user && user.id) {
      const { error, data, success } = await fetchProject(user.id);
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
    getProject();
  }, [getProject]);

  const handleEditProject = (row: IProjectResponse) => {
    childRef.current?.populateTheForm(row);
  }

  const handleDeleteProject = async (row: IProjectResponse) => {
    try {
      const { success } = await deleteProjectParticularId(row.id);
      if (success) {
        toast.success("Project deleted successfully");
        getProject();
      } else {
        toast.error("Failed to delete experience. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete experience. Please try again.");
      return;
    }
  }

  return (
    <>
      <DataTable columns={getColumns({ onEdit: handleEditProject, onDelete: handleDeleteProject })} data={tableData} />
      <CreateProject getProject={getProject} ref={childRef} />
    </>
  )
}

export default Project