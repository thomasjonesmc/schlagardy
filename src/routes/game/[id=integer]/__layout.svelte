<script lang="ts" context="module">

    export async function load({ session, fetch, params }) {

        
        const response = await fetch(`/api/game/${params.id}`);
        const game = response.ok && (await response.json());
        
        session.game = game;

        if (!game) {
            return { status: 404 }
        }

        const me = session.user?.id === game.author.id;

        // only let game author view if it's private
        if (!me && !game.is_public) {
            return { status: 401 }
        };

        return {
            status: response.status,
            ok: true,
            stuff: {
                me
            }
        };
    }
</script>


<slot></slot>
