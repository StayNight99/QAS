import { IUsers } from './../types/user'
import Users from './../models/user'

interface UserRepo {
    getAnswers(): Promise<Array<IUsers>>
    addAnswer(user: IUsers): Promise<IUsers>
    updateAnswer(id: string, user: IUsers): Promise<IUsers | null>
    deleteAnswer(id: string): Promise<IUsers | null>
}

class UserRepoImpl implements UserRepo {
    private constructor() { }

    static of(): UserRepoImpl {
        return new UserRepoImpl()
    }

    async getAnswers(): Promise<Array<IUsers>> {
        return Users.find()
    }

    async addAnswer(user: IUsers): Promise<IUsers> {
        return Users.create(user)
    }

    async updateAnswer(id: string, user: IUsers): Promise<IUsers | null> {
        return Users.findByIdAndUpdate(id, user)
    }

    async deleteAnswer(id: string): Promise<IUsers | null> {
        return Users.findByIdAndDelete(id)
    }
}

export { UserRepoImpl }