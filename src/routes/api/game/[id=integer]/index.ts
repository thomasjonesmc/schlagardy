import supabase from '$lib/db';
import User from '$lib/models/user.model';

export async function get({ params }) {
    const { data, error } = await supabase
        .from('games')
        .select('*, rounds(*), author:profiles(*)')
        .eq('id', params.id)
        .order('ordinal', {foreignTable: 'rounds'});

    if (error || data.length === 0) {
        return { status: 401, body: error };
    }

    const game = data[0];
    game.author = new User(game.author).toPOJO();

    return {
        body: game
    }
}

export async function del({ params }) {
    const { data, error } = await supabase
        .from('games')
        .delete()
        .eq('id', params.id);

    if (error || data.length === 0) {
        return { status: 401, body: error };
    }

    return {
        body: data[0]
    }
}

export async function put({ params, request }) {

    const { title, description, is_public } = await request.json();

    const { data } = await supabase
        .from('games')
        .update({title, description, is_public})
        .eq('id', params.id);

    return {
        body: data[0]
    }
}