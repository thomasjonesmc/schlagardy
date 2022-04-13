import supabase from "$lib/db";

export async function get({  }) {
    return {};
}

export async function put({ params, request }) {

    const { title, board } = await request.json();

    const { data, error } = await supabase
        .from('rounds')
        .update({title, board})
        .eq('ordinal', params.ordinal);

    return {
        body: [ data ]
    }
}