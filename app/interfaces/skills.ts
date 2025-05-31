export interface ISkillsResponse {
    id: string,
    createdAt: string,

    userId: string,
    name: string,
    icon: string,
}

export interface ISkillsSaveRequest {
    userId: string,
    name: string,
    icon: string,
}

export interface ISkillsEditRequest {
    id: string,
    name: string,
    icon: string,
}