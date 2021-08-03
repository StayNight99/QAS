import React, { useState, useEffect, useRef } from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import NodeService from "./service/Server";
import './App.css';
import ProductService from './service/ProductService';
import ReactTagInput from "@pathofdev/react-tag-input";
import { useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';

function QuestionsListApp() {
    var [tags, setTags] = React.useState(["no-tag"])
    const nodeService = new NodeService();
    // const dt = useRef(null);

    const [cookies, setCookie] = useCookies(['UID']);
    let userID = cookies.UID;

    function btnAskQuestion(this : any) {
        window.location.href = '/AskQuestionPage';
    }

    const btnReviewQuestion = (rowData: any) => {
        let QID = rowData._id;
        window.location.href = '/ReviewAnswerPage/' + QID;
    }

    //DataTable
    const [questions, setQuestions] = useState([]);
    const productService = new ProductService();

    useEffect(() => {
        //取得所有Questions
        nodeService.getAllQuestions().then((data) => setQuestions(data));  
    }, []); 

    const reviewBodyTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                <Button type="button" onClick={() => btnReviewQuestion(rowData)}  icon="pi pi-comment" className="p-button-secondary"></Button>
            </React.Fragment>
        );
    }

    const tagTemplate = (rowData: any) => {
        let QuestionType = rowData.QuestionType
        return (
            <React.Fragment>
                <ReactTagInput tags={QuestionType} readOnly onChange={(newTags) => setTags(newTags)}/>
            </React.Fragment>
        );
    }

    const scoreTemplate = (rowData: any) => {
        let AnswerScore = rowData.AnswerScore
        return (
            <React.Fragment>
                {AnswerScore.length}
            </React.Fragment>
        );
    }

    const answerTemplate= (rowData: any) => {
        let Answer = rowData.Answer
        return (
            <React.Fragment>
                {Answer.length}
            </React.Fragment>
        );
    }

    return (
        <div className="default-font">
            <header className="App-header">

                <div className="d-flex">
                    <tr>
                        <td className="padding30px">
                            <h2 className="flex--item fl1 fs-headline1">Questions List</h2>
                        </td>
                        <td className="padding30px">
                            <Button id="btnAskQuestion" label="Ask Question" onClick={btnAskQuestion} />
                        </td>
                    </tr>
                </div>


                <div className="styleWithQuestionTable">
                    <DataTable value={questions} paginator rows={5}>
                        <Column field="QuestionTitle" header="Title" filter filterPlaceholder="Search by title" sortable></Column>
                        <Column field="Questioner_id" header="Name" filter filterPlaceholder="Search by name" sortable></Column>
                        <Column field="Answer" header="Answer Count" body={answerTemplate} sortable></Column>
                        <Column field="AnswerScore" header="Score" body={scoreTemplate} sortable></Column>
                        <Column field="QuestionType" header="Tag"  body={tagTemplate} sortable></Column>
                        <Column field="_id" header="Review" body={reviewBodyTemplate}></Column>
                    </DataTable>
                </div>


            </header>
        </div>
    );
}

export default QuestionsListApp;
