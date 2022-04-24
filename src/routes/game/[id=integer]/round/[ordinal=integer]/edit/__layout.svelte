<script context="module" lang="ts">
    import type { Round } from "$lib/models/game.model";

    export async function load({session, stuff, params}) {
        const ordinal = parseInt(params.ordinal);
        const round: Round = session.game.rounds.find((r: Round) => r.ordinal === ordinal);

        if (!round) {
            return {
                status: 404
            }
        }

        
        if (!stuff.me) {
            return {
                status: 401
            }
        }

        const numRows = round.board.rows.length;
        const numCols = round.board.categories.length;

        return {
            stuff: {
                round,
                numRows,
                numCols,
                ordinal
            }
        };
    }
</script>

<script>
    import "../cell.css";
</script>

<slot></slot>