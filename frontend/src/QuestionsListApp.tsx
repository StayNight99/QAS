import React, { useState, useEffect } from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { NodeService, todoObject } from "./service/nodeService";
import * as TE from "fp-ts/TaskEither";
import { zero } from "fp-ts/Array";
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import './App.css';
import { default as swal } from 'sweetalert2'


function QuestionsListApp() {
    const [addAccount, setAddAccount] = useState<string>("");
    const [addPassword, setAddPassword] = useState<string>("");
    const nodeService = new NodeService();


    function btnAskQuestion() {
        window.location.href = '/AskQuestionPage';
    }


    return (
        <div className="default-font">
            <header className="App-header">

                <div className="d-flex">
                    <tr>
                        <td className="padding30px">
                            <h2 className="flex--item fl1 fs-headline1">Top Questions</h2>
                        </td>
                        <td className="padding30px">
                            <Button id="btnAskQuestion" label="Ask Question" onClick={btnAskQuestion} className="" />
                        </td>
                    </tr>
                </div>


                {/*Ref: https://primefaces.org/primereact/showcase/#/datatable */}
                

            </header>
        </div>
    );
}

export default QuestionsListApp;
