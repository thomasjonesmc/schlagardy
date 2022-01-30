export interface SchlagardyBoard {
	id: string;
	public: boolean;
	boardName: string;
	schlagardyCategories: Catergory[];
	doubleSchlagardyCategories?: Catergory[];
	finalSchlagardyCategories?: Question;
	createdBy: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Catergory {
	name: string;
	questions: Question[];
}

export interface Question {
	question: string;
	answer: string;
	value: number;
	isVideoQuestion: boolean;
	isFinalSchlagardy: boolean;
	videoQuestionLink?: string;
}
