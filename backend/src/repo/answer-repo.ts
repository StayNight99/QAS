<<<<<<< HEAD
import { IAnswer } from './../types/answer'
import Answer from './../models/answer'

interface AnswerRepo {
    getAnswer(id: string): Promise<IAnswer | null>
    addAnswer(answer: IAnswer): Promise<IAnswer>
    updateAnswer(id: string, answer: IAnswer): Promise<IAnswer | null>
    deleteAnswer(id: string): Promise<IAnswer | null>
}

class AnswerRepoImpl implements AnswerRepo {
    private constructor() { }

    static of(): AnswerRepoImpl {
        return new AnswerRepoImpl()
    }

    async getAnswer(id: string): Promise<IAnswer | null> {
        return Answer.findById(id)
    }

    async addAnswer(answer: IAnswer): Promise<IAnswer> {
        return Answer.create(answer)
    }

    async updateAnswer(id: string, answer: IAnswer): Promise<IAnswer | null> {
        return Answer.findByIdAndUpdate(id, answer)
    }

    async deleteAnswer(id: string): Promise<IAnswer | null> {
        return Answer.findByIdAndDelete(id)
    }
}

=======
import { IAnswer } from './../types/answer'
import Answer from './../models/answer'

interface AnswerRepo {
    getAnswer(id: string): Promise<IAnswer | null>
    addAnswer(answer: IAnswer): Promise<IAnswer>
    updateAnswer(id: string, answer: IAnswer): Promise<IAnswer | null>
    deleteAnswer(id: string): Promise<IAnswer | null>
}

class AnswerRepoImpl implements AnswerRepo {
    private constructor() { }

    static of(): AnswerRepoImpl {
        return new AnswerRepoImpl()
    }

    async getAnswer(id: string): Promise<IAnswer | null> {
        return Answer.findById(id)
    }

    async addAnswer(answer: IAnswer): Promise<IAnswer> {
        return Answer.create(answer)
    }

    async updateAnswer(id: string, answer: IAnswer): Promise<IAnswer | null> {
        return Answer.findByIdAndUpdate(id, answer)
    }

    async deleteAnswer(id: string): Promise<IAnswer | null> {
        return Answer.findByIdAndDelete(id)
    }
}

>>>>>>> a24892af95dcabfb00835513254f2bf40713ac96
export { AnswerRepoImpl }