import { IQuestion } from './../types/question'
import { IUsers } from './../types/user'
import Question from './../models/question'
import Users from './../models/user'

function getUserName (question: Array<IQuestion>, user: IUsers, userName: Array<string>) {
    question.forEach(async(value) => {
        user = await Users.findById(value.Questioner_id) as IUsers
        userName.push(user.Name)
    })
    return userName
}

export { getUserName }