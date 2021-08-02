import axios from "axios";
import * as A from "fp-ts/Array";
import * as TE from "fp-ts/TaskEither";
import * as O from "fp-ts/lib/Option";
import * as E from "fp-ts/Either";
import { of } from "fp-ts/Identity";
import { zero } from "fp-ts/Array";
import { pipe } from "fp-ts/lib/function";
import QuestionsListApp from "../QuestionsListApp";

export default class Server {

    //examples
    async getTodoData() {
        try {
            const res = await axios.get("/todos");
            return res.data.todos;
        } catch (e) {
            console.error(e);
        }
    }
    async postTodoData(data: string) {
        try {
            const res = await axios.post("/todos", {
                name: data,
                id: data
            });
        } catch (e) {
            console.error(e);
        }
    }
    async delTodoData(data: string) {
        try {
            const res = await axios.delete(`/todos/${data}`);
        } catch (e) {
            console.error(e);
        }
    }

    //[測試] loginPage一般帳號密碼登入
    //Input : account、password
    //Output : loginMsg(login success! / password incorrect! / account not exist!) / User(Schema)
    async postLoginData(strAccount: string, strPassword: string) {
        try {
            //const res = await axios.get("/loginData/" + strAccount + "/" + strPassword);
            const res = await axios.post("http://localhost:8888/login", {
                Name: strAccount,
                Passwd: strPassword
            });
            console.log(res);

            return res.data;
        } catch (e) {
            console.error(e);
        }
    }

    //使用者發問問題，需要新增問題相關資訊至資料庫
    //Input : UserPK、Contents、Question Type
    //Output : success/fall
    async setNewQuestion(strUserPK: number, strTitle: string, strContent: string, strQuestionType: string[]) {
        try {
            let question: any
            question.Questioner_id = strUserPK
            question.QuestionTitle = strTitle
            question.Contents = strContent
            question.QuestionType = strQuestionType

            const res = await axios.post("http://localhost:8888/question/new", question);
            console.log(res);       

            return res.data;
        } catch (e) {
            console.error(e);
        }
    }

    //取得所有問題
    async getAllQuestions() {
        try {
            const res = await axios.get("http://localhost:8888/question");
            console.log(res);

            //console.log(res.data['question'].QuestionType);
            //console.log(res.data['question'].AnswerScore.count());

            return res.data['question'];
        } catch (e) {
            console.error(e);
        }
    }

    async getQuestionTitleByQID(strQID: string) {
        try {
            const res = await axios.get("http://localhost:8888/question/" + strQID);
            //console.log(res);

            return res.data.question.QuestionTitle;
        } catch (e) {
            console.error(e);
        }
    }

    async getQuestionContentsByQID(strQID: string) {
        try {
            const res = await axios.get("http://localhost:8888/question/" + strQID);
            //console.log(res);

            return res.data.question.Contents;
        } catch (e) {
            console.error(e);
        }
    }

    async getQuestionTagByQID(strQID: string) {
        try {
            const res = await axios.get("http://localhost:8888/question/" + strQID);
            //console.log(res);

            return res.data.question.QuestionType;
        } catch (e) {
            console.error(e);
        }
    }
}
