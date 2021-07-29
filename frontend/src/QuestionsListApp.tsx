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
import ProductService from './service/ProductService';

function QuestionsListApp() {
    const [addAccount, setAddAccount] = useState<string>("");
    const [addPassword, setAddPassword] = useState<string>("");
    const nodeService = new NodeService();

    function btnAskQuestion() {
        window.location.href = '/AskQuestionPage';
    }

    //DataTable
    const [products, setProducts] = useState([]);
    const [multiSortMeta, setMultiSortMeta] = useState([{ field: 'category', order: -1 }]);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                    <DataTable value={products} paginator rows={5}>
                        <Column field="code" header="Title" sortable></Column>
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="category" header="Answer Count" sortable></Column>
                        <Column field="quantity" header="Score" sortable></Column>
                        <Column field="price" header="Tag" sortable></Column>
                    </DataTable>
                </div>


            </header>
        </div>
    );
}

export default QuestionsListApp;
