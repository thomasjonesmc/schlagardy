import type { Question, SchlagardyBoard, Catergory } from '$lib/models/SchlagardyBoard';

const question: Question = {
	question: 'this is the bad guy',
	answer: 'who is billie eilish?',
	isFinalSchlagardy: false,
	isVideoQuestion: false,
	value: 200
};

const questions: Question[] = [];

for (let i = 0; i < 5; i++) {
	const newQuestion: Question = {
		answer: question.answer,
		isFinalSchlagardy: false,
		isVideoQuestion: false,
		question: question.question,
		value: 200 * (i + 1)
	};

	questions.push(newQuestion);
}

const category: Catergory = {
	name: 'test category',
	questions: [questions[0], questions[1], questions[2], questions[3], questions[4]]
};

export const gameBoard: SchlagardyBoard = {
	boardName: 'test board',
	public: true,
	createdAt: new Date(),
	updatedAt: new Date(),
	id: 'random-uuid-from-supabase',
	createdBy: 'tom',
	schlagardyCategories: [category, category, category, category, category, category]
};
