import React, { useState } from "react";
import { CancelButton, ModalComponent,  Dropzone } from "@comps/components";
import { makeRequest, notify } from "@utils/helpers";
import { importUser } from "../requests";

const ImportUser = (props) => {
  const [loader, setLoader] = useState(false);
  
  const upload = (files) => {
    const data = new FormData();
    data.append('file', files[0], files.name);
    makeRequest(setLoader, importUser, data, onSuccess, onError);
  }

  const onSuccess = (res, response) => {
    notify("User Import", response.msg);
    props.onImported(false);
  }

  const onError = (res) => {
    notify("User Import", res.msg);
  }

  // ------------------------------------
  // Start footer buttons array
  // ------------------------------------
  const footer = [
    <CancelButton key="close_button" onClick={() => props.onImported(false)} />
  ];
  // ------------------------------------
  // Eend footer buttons array
  // ------------------------------------

  return (
    <ModalComponent mainTitle="Import" subTitle="User" visible={true} footer={footer} >
        <Dropzone text="Drag or Click Here To Upload File" multiple={false} files={upload} loader={loader}/>
    </ModalComponent>
  );
}

export default ImportUser
