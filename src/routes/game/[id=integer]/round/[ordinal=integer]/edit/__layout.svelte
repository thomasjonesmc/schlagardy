<script context="module" lang="ts">
    export async function load({ session, fetch, params, stuff }) {

        if (session.game?.author.id !== session.user?.id) {
            return {
                status: 401
            }
        }

        return {};
    }
</script>

<slot></slot>