import type User from "./user.model";

export default class Game {

    id: number;
    created_at: string;
    title = '';
    description = '';
    is_public = true;
    is_in_progress: boolean;
    play_count: number;
    image_url: string;
    updated_at: string;
    user_id: string;
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
    
    rows: Array<number>;
    categories: Array<Category>;

    constructor(rows: number, cols: number, rowStart = 100, rowIncrement = rowStart) {
        this.categories = [];
        this.rows = [];

        for (let i = 0; i < cols; i++) {
            this.categories[i] = new Category(rows);
        }

        for (let i = 0; i < rows; i++) {
            this.rows[i] = i * rowIncrement + rowStart;
        }
    }
}

export class Category {

    category: string;
    cells: Array<Cell>;

    constructor(cells: number, category='') {
        this.category = category;
        this.cells = [];

        for (let i = 0; i < cells; i++) {
            this.cells[i] = new Cell();
        }
    }
}

export class Cell {
    
    question: string;
    answer: string;
    isDailyDouble: boolean;

    constructor(question='', answer='', isDailyDouble=false) {
        this.question = question;
        this.answer = answer;
        this.isDailyDouble = isDailyDouble;
    }

}