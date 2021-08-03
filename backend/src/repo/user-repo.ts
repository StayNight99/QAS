import { IUsers } from './../types/user'
import Users from './../models/user'

interface UserRepo {
    getUsers(): Promise<Array<IUsers>>
    getUser(id: string): Promise<IUsers | null>
    addUser(user: IUsers): Promise<IUsers>
    updateUser(id: string, user: IUsers): Promise<IUsers | null>
    deleteUser(id: string): Promise<IUsers | null>
}

class UserRepoImpl implements UserRepo {
    private constructor() { }

    static of(): UserRepoImpl {
        return new UserRepoImpl()
    }

    async getUsers(): Promise<Array<IUsers>> {
        return Users.find()
    }

    async getUser(id: string): Promise<IUsers | null> {
        return Users.findById(id)
    }

    async addUser(user: IUsers): Promise<IUsers> {
        return Users.create(user)
    }

    async updateUser(id: string, user: IUsers): Promise<IUsers | null> {
        return Users.findByIdAndUpdate(id, user)
    }

    async deleteUser(id: string): Promise<IUsers | null> {
        return Users.findByIdAndDelete(id)
    }
}

export { UserRepoImpl }