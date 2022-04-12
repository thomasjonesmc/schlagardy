export default class User {
    id: string;
    email: string;
    confirmedAt: string;
    lastSignInAt: string;
    createdAt: string;
    updatedAt: string;
    displayName: string;
    username: string;
    isPublic: boolean;

    constructor(sp: SupabaseProfile) {
        this.id = sp.id;
        this.email = sp.email;
        this.username = sp.username;
        this.displayName = sp.display_name;
        this.createdAt = sp.created_at;
        this.lastSignInAt = sp.last_sign_in_at;
        this.isPublic = sp.is_public;
    }

    toJSON(): string {
        return JSON.stringify({ ...this });
    }

    toPOJO(): User {
        return JSON.parse(this.toJSON());
    }
}

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

export type SupabaseProfile = {
    id: string,
    username: string,
    display_name: string,
    image_url: string,
    email: string,
    created_at: string,
    is_public: boolean,
    last_sign_in_at: string
}