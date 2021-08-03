import React, { useState, useEffect } from "react";
import './App.css';
import NodeService from "./service/Server";
import { default as swal } from 'sweetalert2'
import { InputText } from "primereact/inputtext";
import ReactTagInput from "@pathofdev/react-tag-input";
import { useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Editor } from 'primereact/editor';

function ReviewAnswerApp() {
  const nodeService = new NodeService();
  const [editorBody, setEditorBody] = useState<string>('');
  const [inputTitle, setInputTitle] = useState<string>('no-title');
  const [tags, setTags] = React.useState(["example tag"])
  const [displayDialog, setDisplayDialog] = useState(false);

  //從URL取參數
  let params: any = useParams();
  let QID = params.QID;
  let UID = params.UID;

  useEffect(() => {
    nodeService.getQuestionTitleByQID(QID).then((data) => setInputTitle(data));
    nodeService.getQuestionContentsByQID(QID).then((data) => setEditorBody(data));
    nodeService.getQuestionTagByQID(QID).then((data) => setTags(data));
  }, []);

  //Answer DataTable
  const [answers, setAnswers] = useState([]);

  const scoreTemplate = (rowData: any) => {
    let AnswerScore = rowData.Scoring
    return (
      <React.Fragment>
        {AnswerScore.length}
      </React.Fragment>
    );
  }

  useEffect(() => {
    nodeService.getAllAnswersByQID(QID).then((data) => setAnswers(data));
  }, []);

  //提供答案Dialog
  const [inputAnswer, setInputAnswer] = useState<string>('');

  function btnProvideAnswer(this: any) {
    setDisplayDialog(true);
  }

  const hideDialog = () => {
    setDisplayDialog(false);
  };

  async function btnSaveAnswer(){        
    let answerData = await nodeService.setNewAnswer(QID,inputAnswer,UID)
    if (answerData === "Create Answer Failed") {
      swal.fire('發生錯誤！', answerData, 'error');
    }
    else 
    {
      swal.fire('成功回覆！', answerData, 'success');
    }
    //setAnswers(answers);
    setDisplayDialog(false);
  };

  const editDialogFooter = (
    <React.Fragment>
      <Button label='Cancel' icon='pi pi-times' className='p-button-text' onClick={hideDialog} />
      <Button label='Post' icon='pi pi-check' className='p-button-text' onClick={btnSaveAnswer} />
    </React.Fragment>
  );

  return (
    <div className="default-font">
      <header className="App-header">
        {/*Show this Question */}
        <div className="d-flex">
          <h2 className="flex--item fl1 fs-headline1">Need Your Answer</h2>
        </div>
        <tr>
          <td >
            <div>
              <div style={{ margin: '15px 0 15px 0' }}>Title</div>
              <InputText value={inputTitle} className="width400pxWithInput" readOnly onChange={(e) => setInputTitle(e.target.value)} />
            </div>
          </td>

          <td>
            <div className="width400pxWithInput">
              <div style={{ margin: '15px 0 15px 0' }}>Keyword</div>
              <ReactTagInput tags={tags} readOnly onChange={(newTags) => setTags(newTags)} />
            </div>
          </td>

          <div>
            <div style={{ margin: '15px 0 15px 0' }}>Body</div>
            
            <Editor className="widthAndHeightQuestion" value={editorBody} readOnly onTextChange={(e) => setEditorBody} />
          </div>


        </tr>

        {/*Show All Answer */}
        <tr>
          <td className="padding30px">
            <h2 className="flex--item fl1 fs-headline1">Answer List</h2>
          </td>
          <td className="padding30px">
            <Button id="btnProvideAnswer" label="Provide Answer" onClick={btnProvideAnswer} />
          </td>
        </tr>
        <div className="styleWithAnswerTable">
          <DataTable value={answers} paginator rows={5}>
            <Column field="User_id" header="Name" filter filterPlaceholder="Search by name"></Column>
            <Column field="Contents" header="Contents" filter filterPlaceholder="Search by content"></Column>
            <Column field="Scoring" header="Score" body={scoreTemplate} sortable></Column>
          </DataTable>
        </div>

        {/*Answer Dialog */}
        <Dialog header='Provide Your Answer'
          visible={displayDialog}
          footer={editDialogFooter}
          style={{ width: '450px' }}
          className='p-fluid'
          onHide={hideDialog}
          modal
        >
          <InputTextarea value={inputAnswer} onChange={(e) => setInputAnswer(e.target.value)} rows={10} cols={30} autoResize />
        </Dialog>

      </header>
    </div>
  );
}

export default ReviewAnswerApp;
