import { IAnswer } from './../types/answer'
import Answer from './../models/answer'

interface QuestionRepo {
    getAnswers(): Promise<Array<IAnswer>>
    addAnswer(question: IAnswer): Promise<IAnswer>
    updateAnswer(id: string, question: IAnswer): Promise<IAnswer | null>
    deleteAnswer(id: string): Promise<IAnswer | null>
}

class AnswerRepoImpl implements QuestionRepo {
    private constructor() { }

    static of(): AnswerRepoImpl {
        return new AnswerRepoImpl()
    }

    async getAnswers(): Promise<Array<IAnswer>> {
        return Answer.find()
    }

    async addAnswer(question: IAnswer): Promise<IAnswer> {
        return Answer.create(question)
    }

    async updateAnswer(id: string, question: IAnswer): Promise<IAnswer | null> {
        return Answer.findByIdAndUpdate(id, question)
    }

    async deleteAnswer(id: string): Promise<IAnswer | null> {
        return Answer.findByIdAndDelete(id)
    }
}

export { AnswerRepoImpl }