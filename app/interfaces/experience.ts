export interface IExperience {
    id: string,
    createdAt: string,
    userId: string,

    position: string,
    companyName: string,
    countryName: string,
    fromDate: string,
    endDate: string,
    description: string,
}

export interface IExperienceSaveRequest {
    userId: string,
    position: string,
    companyName: string,
    countryName: string,
    fromDate: string,
    endDate?: string,
    description: string,
    isPresent?: boolean,
}

export interface IExperienceEditRequest {
    id: string,
    position: string,
    companyName: string,
    countryName: string,
    fromDate: string,
    endDate?: string,
    description: string,
    isPresent?: boolean,
    userId: string,
}

export interface IExperienceResponse {
    id: string,
    createdAt: string,
    userId: string,
    position: string,
    companyName: string,
    countryName: string,
    fromDate: string,
    endDate: string,
    description: string,
    isPresent: boolean,
}