// public.profiles table
export default class User {
    id: string;
    username: string;
    display_name: string;
    image_url: string;
    email: string;
    created_at: string;
    is_public: boolean;
    last_sign_in_at: string;
}



// auth.users table
export type SupabaseUser = {
    id: string,
    aud: string,
    role: string,
    email: string,
    email_confirmed_at: string,
    phone: string,
    confirmed_at: string,
    last_sign_in_at: string,
    user_metadata: {
        displayName: string,
        username: string,
        isPublic: boolean
    },
    created_at: string,
    updated_at: string
}