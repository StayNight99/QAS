import React, { useState, useEffect } from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import NodeService from "./service/Server";
import * as TE from "fp-ts/TaskEither";
import { zero } from "fp-ts/Array";
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import './App.css';
import { default as swal } from 'sweetalert2'
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@7"></script> 

function LoginApp() {
    const [addAccount, setAddAccount] = useState<string>("");
    const [addPassword, setAddPassword] = useState<string>("");
    const nodeService = new NodeService();

    async function submitLoginData() {
        //await postData();
        //getData();
        let loginData = await nodeService.postLoginData(addAccount , addPassword);
        if(loginData.msg === "login success!")
        {
            //swal.fire('登入成功！',loginData.msg,'success')   
            window.location.href = "/QuestionsListPage/" + loginData._id
        }
        else
        {
            swal.fire('登入失敗！',loginData.msg,'error')
        }
        //nodeService.getTodoData().then((data) => setTodolist(data));
    }

    function registerAccount() {
       
    }


    return (
        <div className="App  default-font">
            <header className="App-header">
            <h6>Account</h6>
            <InputText
                id="inputAccount"
                value={addAccount}
                onChange={(e) => setAddAccount(e.target.value)}
            />
            <h6>Password</h6>
            <Password 
                id="inputPassword"
                value={addPassword} 
                onChange={(e) => setAddPassword(e.target.value)} 
                feedback={false} 
            />

            <br></br>
            <Button id="btnSubmit" label="Log in" onClick={submitLoginData} className="paddingWithTop1pp"/>
            <br></br>

            <div className="fontSize13px">
                Don’t have an account? <a onClick={registerAccount} className="App-link">Sign up</a>    
            </div>

            </header>
            
        </div>
    );
}

export default LoginApp;
