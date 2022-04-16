import supabase from "$lib/db"
import User from "$lib/models/user.model";

export async function get({ params }) {

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', params.username);

    if (data.length === 0) {
        return { body: null, status: 404 }
    }

    const user = new User(data[0]).toPOJO();

    return {
        body: {
            user
        }
    }
}