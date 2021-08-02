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
import { Editor } from 'primereact/editor';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { useParams } from "react-router-dom";

function AskQuestionApp() {
    const [editorBody, setEditorBody] = useState<string>('<div>1. Summarize the problem</div><div>2. Describe what you’ve tried</div><div>3. Show some code</div>');
    const [inputTitle, setInputTitle] = useState('');
    const [tags, setTags] = React.useState(["example tag"])
    const nodeService = new NodeService();

    //從URL取參數
    let params: any = useParams();
    let UserID = params._id;

    async function btnPostQuestion() {
        let dbAccessData = await nodeService.setNewQuestion(UserID, inputTitle, editorBody, tags);

        if (dbAccessData === "Create Question Failed") {
            swal.fire('發生錯誤！', '請檢查資料是否填寫不完全!', 'error');
        }
        else {
            swal.fire('成功提問！', 'Your question has been posted!', 'success').then(function (result) {
                window.location.href = "/QuestionsListPage/" + UserID
            });;
        }
    }


    return (
        <div className="default-font">
            <header className="App-header">

                <div className="d-flex">
                    <h2 className="flex--item fl1 fs-headline1">Ask a public question</h2>
                </div>
                <tr>
                    <div>
                        <div style={{ margin: '15px 0 15px 0' }}>Title</div>
                        <div>
                            <p className="fontSize13px">Be specific and imagine you’re asking a question to another person</p>
                        </div>
                        <InputText value={inputTitle} style={{ width: '100%' }} placeholder="e.g. Is there an R function for finding the index of an element in a vector?" onChange={(e) => setInputTitle(e.target.value)} />
                    </div>

                    <div>
                        <div style={{ margin: '15px 0 15px 0' }}>Body</div>
                        <div>
                            <p className="fontSize13px">Include all the information someone would need to answer your question</p>
                        </div>
                        <Editor style={{ height: '320px' }} value={editorBody} onTextChange={(e) => setEditorBody} />
                    </div>

                    <div>
                        <div style={{ margin: '15px 0 15px 0' }}>Keyword</div>
                        <div>
                            <p className="fontSize13px">Add some tags to describe what your question is about</p>
                        </div>
                        <ReactTagInput tags={tags} onChange={(newTags) => setTags(newTags)} />
                    </div>

                    <Button id="btnPostQuestion" style={{ margin: '15px 0 15px 0' }} label="Post your Question" onClick={btnPostQuestion} />
                </tr>

            </header>
        </div>
    );
}

export default AskQuestionApp;
