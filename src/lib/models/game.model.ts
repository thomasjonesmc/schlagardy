import type User from "./user.model";

export default class Game {

    id: number;
    created_at: string;
    title: string;
    description: string;
    is_public: boolean;
    is_in_progress: boolean;
    play_count: number;
    image_url: string;
    updated_at: string;
    author: User;
    rounds: Array<Round>;

}

export class Round {
    id: number;
    title: string;
    game_id: string;
    created_at: string;
    updated_at: string;
    ordinal: number;
    board: Board;
}

export class Board {
    constructor(rows: number, cols: number, rowStart: number = 100, rowIncrement: number = rowStart) {
        this.categories = [];
        this.rows = [];

        for (let i = 0; i < cols; i++) {
            this.categories[i] = new Category(rows);
        }

        for (let i = 0; i < rows; i++) {
            this.rows[i] = i * rowIncrement + rowStart;
        }
    }

    rows: Array<number>;
    categories: Array<Category>;
}

export class Category {

    constructor(cells: number, category='') {
        this.category = category;
        this.cells = [];

        for (let i = 0; i < cells; i++) {
            this.cells[i] = new Cell();
        }
    }

    category: string;
    cells: Array<Cell>;
}

export class Cell {

    constructor(question='', answer='', isDailyDouble=false) {
        this.question = question;
        this.answer = answer;
        this.isDailyDouble = isDailyDouble;
    }

    question: string;
    answer: string;
    isDailyDouble: boolean;
}