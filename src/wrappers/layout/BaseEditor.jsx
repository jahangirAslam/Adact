import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";

const BaseEditor = (props) => {
    const [rawData,setRawData] = useState(EditorState.createEmpty());
    const [data,setData] = useState();
    const handleEditorChange = (state) => {
        setRawData(state);
        setData(convertToHTML(rawData.getCurrentContent()));
      }
    return (<Editor {...props} EditorState={setRawData} onEditorStateChange={handleEditorChange} onChange={props.onChange(data)} />);
}

export default BaseEditor;
