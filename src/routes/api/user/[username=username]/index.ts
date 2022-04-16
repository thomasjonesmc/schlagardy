import supabase from "$lib/db"
import User from "$lib/models/user.model";

export async function get({ params }) {

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', params.username);

    const user = new User(data[0]).toPOJO();

    return {
        body: {
            user
        }
    }
}