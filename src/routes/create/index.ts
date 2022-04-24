export async function get({ locals }) {
    if (!locals.user) {

        return {
            status: 302,
            headers: {
                location: `/signin?goto=/create`
            }
        };
    }

    return {};
}