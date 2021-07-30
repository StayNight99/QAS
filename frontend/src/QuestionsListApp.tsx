import React, { useState, useEffect, useRef } from "react";
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
import { Divider } from 'primereact/divider';
import './App.css';
import { default as swal } from 'sweetalert2'
import ProductService from './service/ProductService';

function QuestionsListApp() {
    const [addAccount, setAddAccount] = useState<string>("");
    const [addPassword, setAddPassword] = useState<string>("");
    const nodeService = new NodeService();
    const dt = useRef(null);

    function btnAskQuestion() {
        window.location.href = '/AskQuestionPage';
    }

    const btnReviewQuestion = (rowData: any) => {
        let QID = rowData.Questioner_id
        window.location.href = '/ReviewAnswerPage/' + QID;
    }

    //DataTable
    const [products, setProducts] = useState([]);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const reviewBodyTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                <Button type="button" onClick={() => btnReviewQuestion(rowData)}  icon="pi pi-comment" className="p-button-secondary"></Button>
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
                            <Button id="btnAskQuestion" label="Ask Question" onClick={btnAskQuestion} className="" />
                        </td>
                    </tr>
                </div>


                <div className="styleWithQuestionTable">
                    <DataTable value={products} ref={dt} paginator rows={5}>
                        <Column field="title" header="Title" sortable></Column>
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="category" header="Answer Count" sortable></Column>
                        <Column field="quantity" header="Score" sortable></Column>
                        <Column field="price" header="Tag" sortable></Column>
                        <Column field="Questioner_id" header="Review" body={reviewBodyTemplate}></Column>
                    </DataTable>
                </div>


            </header>
        </div>
    );
}

export default QuestionsListApp;
