import supabase from "$lib/db";

export async function get({ params }) {

    let status = 200;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', params.username);

    const user = data[0];
    
    if (error) status = 500;
    else if (!user) status = 404;
    else if (!user.is_public) status = 401;

    return {
        status,
        body: {
            user,
            error
        }
    }
}