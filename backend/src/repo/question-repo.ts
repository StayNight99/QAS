import { IQuestion } from './../types/question'
import Question from './../models/question'

interface QuestionRepo {
    getQuestions(): Promise<Array<IQuestion>>
    addQuestion(question: IQuestion): Promise<IQuestion>
    updateQuestion(id: string, question: IQuestion): Promise<IQuestion | null>
    deleteQuestion(id: string): Promise<IQuestion | null>
}

class QuestionRepoImpl implements QuestionRepo {
    private constructor() { }

    static of(): QuestionRepoImpl {
        return new QuestionRepoImpl()
    }

    async getQuestions(): Promise<Array<IQuestion>> {
        return Question.find()
    }

    async addQuestion(question: IQuestion): Promise<IQuestion> {
        return Question.create(question)
    }

    async updateQuestion(id: string, question: IQuestion): Promise<IQuestion | null> {
        return Question.findByIdAndUpdate(id, question)
    }

    async deleteQuestion(id: string): Promise<IQuestion | null> {
        return Question.findByIdAndDelete(id)
    }
}

export { QuestionRepoImpl }