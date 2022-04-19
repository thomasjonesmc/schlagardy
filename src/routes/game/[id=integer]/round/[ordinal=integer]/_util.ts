import type { Board, Cell } from "$lib/models/game.model";

export function getCellClass(
    cell: Cell, board: Board, row: number, col: number
) {
    const numRows = board.rows.length;
    const numCols = board.categories.length;

    let cssClass = "";

    let firstCol = col === 0;
    let lastCol = col === numCols - 1;
    let firstRow = row === 0;
    let lastRow = row === numRows - 1;

    if (firstRow && firstCol) cssClass += "tl-cell ";
    else if (firstRow && lastCol) cssClass += "tr-cell ";
    else if (lastRow && firstCol) cssClass += "bl-cell ";
    else if (lastRow && lastCol) cssClass += "br-cell ";

    else if (firstCol) cssClass += "first-category ";
    else if (lastCol) cssClass += "last-category "

    else if (firstRow) cssClass += "first-row ";
    else if (lastRow) cssClass += "last-row ";

    if (!cell.question && !cell.answer) cssClass += "unfinished ";
    else if (cell.question && cell.answer) cssClass += "finished ";
    else cssClass += "in-progress ";

    return cssClass;
}