export interface IUserProfile {
    full_name: string,
    email: string,
    clerk_user_id: string,

    id?: string,
    created_at?: string,
    
    whatsapp_no?: string,
    phone_no?: string, 
    primary_skills?: string,
    hero_image?: string,
    profile_title?: string,
}

export interface IUserProfileResponse {
  data: IUserProfile | null,
  success: boolean,
  error: string | null,
}

export interface IUser {
    full_name: string,
    email: string,
    clerk_user_id?: string,

    id?: string,
    created_at?: string,
    
    whatsAppNo?: string,
    phoneNo?: string, 
    primarySkills?: string,
    heroImage?: string,
    profileTitle?: string,
}

export interface ICurrentUserResponse {
  data: IUser | null,
  success: boolean,
  error: string | null,
}

export interface IUserRequest {
    id?: string,
    whatsAppNo?: string,
    phoneNo?: string, 
    primarySkills?: string,
    heroImage?: string,
    profileTitle?: string,
}

export interface IUserResponse {
    success: boolean,
    data: IUser,
}
