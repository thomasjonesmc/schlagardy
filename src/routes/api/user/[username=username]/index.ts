export function get({locals}) {

    return {
        body: {
            user: locals.user
        }
    }
}