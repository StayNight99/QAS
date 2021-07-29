import axios, { AxiosResponse } from "axios";
import * as A from "fp-ts/Array";
import * as TE from "fp-ts/TaskEither";
import * as O from "fp-ts/lib/Option";
import * as E from "fp-ts/Either";
import { of } from "fp-ts/Identity";
import { zero } from "fp-ts/Array";
import { pipe } from "fp-ts/lib/function";

export type todoObject = {
    name: string;
    id: string;
};

export class NodeService {

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
    async getLoginData(strAccount: string, strPassword: string) {
        try {
            //const res = await axios.get("/loginData/" + strAccount + "/" + strPassword);
            const res = await axios.get("http://localhost:8888/loginData/" + strAccount + "/" + strPassword);
            console.log(res);
            
            //return res.data.todos;
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }

    //使用者發問問題，需要新增問題相關資訊至資料庫
    //Input : UserPK、Contents、Question Type
    //Output : success/fall
    async setNewQuestionToDB(strUserPK: string, strContent: string, strQuestionType: string) {
        try {
            //const res = await axios.get("/loginData/" + strAccount + "/" + strPassword);
            const res = await axios.get("http://localhost:8888/setNewQuestionToDB/" + strUserPK + "/" + strContent + "/" + strQuestionType);
            console.log(res);
            
            //return res.data.todos;
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }
    

}
