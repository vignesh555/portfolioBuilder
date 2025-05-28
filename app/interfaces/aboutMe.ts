export interface IAboutMeRequest {
    bio: string,
    bioImage: string,
}

export interface IAboutMeResponse {
    id: string,
    created_at: string,
    user_id: string,

    bio: string,
    bio_image: string,
}