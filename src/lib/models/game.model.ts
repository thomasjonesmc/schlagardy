export default class game {

    id: number;
    created_at: string;
    title: string;
    description: string;
    is_public: boolean;
    is_in_progress: boolean;
    play_count: number;
    image_url: string;
    updated_at: string;
    rounds: Array<Round>;
            
}

export class Round {
    id: number;
    title: string;
    jeopardy_id: string;
    created_at: string;
    updated_at: string;
    board: {
        categories: Array<Category>;
    }
}

export class Category {
    category: string;
    cells: Array<Cell>;
}

export class Cell {
    question: string;
    answer: string;
    isDailyDouble: boolean;
}