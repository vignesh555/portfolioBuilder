export interface IProjectResponse {
    id: string,
    createdAt: string,
    userId: string,

    name: string,
    objective: string,
    description: string,
    skills: string
}

export interface IProjectSaveRequest {
    userId: string,
    name: string,
    objective: string,
    description: string,
    skills: string
}

export interface IProjectEditRequest {
    id: string,
    name: string,
    objective: string,
    description: string,
    skills: string,
    userId: string
}