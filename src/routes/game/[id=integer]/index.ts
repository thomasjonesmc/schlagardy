import supabase from "$lib/db";
import User from "$lib/models/user.model";

export async function get({params}) {
    const { data, error } = await supabase
        .from('games')
        .select('*, rounds(*), author:profiles(*)')
        .eq('id', params.id)
        .order('ordinal', {foreignTable: 'rounds'});

    if (error || data.length === 0) {
        return { 
            status: 401, 
            body: error 
        };
    }

    const game = data[0];
    game.author = new User(game.author).toPOJO();

    return {
        body: game
    }
}