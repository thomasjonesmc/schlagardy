import supabase from "$lib/db";

export async function get() {
    return {};
}

export async function put({ params, request }) {

    const { title, board } = await request.json();

    const { data } = await supabase
        .from('rounds')
        .update({title, board})
        .eq('game_id', params.id)
        .eq('ordinal', params.ordinal);

    return {
        body: data[0]
    }
}