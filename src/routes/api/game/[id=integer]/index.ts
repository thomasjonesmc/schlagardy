import supabase from '$lib/db';
import type Game from '$lib/models/game.model';

export async function get({ params, locals }) {
    const { data, error } = await supabase
        .from('games')
        .select('*, rounds(*), author:profiles(*)')
        .eq('id', params.id)
        .order('ordinal', {foreignTable: 'rounds'});

    const game: Game = data[0];
    const me = locals.user?.id === game.author.id;
    
    let status = 200;

    if (error) status = 500;
    if (!game) status = 404;
    if (!game.is_public && !me) status = 401;

    return {
        status,
        body: {
            game,
            error,
            // me
        }
    }
}

export async function del({ params }) {
    const { data, error } = await supabase
        .from('games')
        .delete()
        .eq('id', params.id);

    const game: Game = data[0];

    let status = 200;

    if (error) status = 500;
    if (!game) status = 404;

    return {
        status,
        body: {
            game,
            error
        }
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