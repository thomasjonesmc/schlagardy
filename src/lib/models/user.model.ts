export default class User {
    id: string;
    email: string;
    phone: string;
    confirmed_at: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
    displayName: string;
    username: string;
    public: boolean;

    constructor(su: SupabaseUser) {
        this.id = su.id;
        this.email = su.email;
        this.phone = su.phone;
        this.username = su.user_metadata.username;
        this.displayName = su.user_metadata.displayName;
        this.confirmed_at = su.confirmed_at;
        this.created_at = su.created_at;
        this.last_sign_in_at = su.last_sign_in_at;
        this.updated_at = su.updated_at;
        this.public = su.user_metadata.public;
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
        public: boolean,
    },
    created_at: string,
    updated_at: string
}