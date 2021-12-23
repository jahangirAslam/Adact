import React from 'react'
import Dropzone from 'react-dropzone'
import { CloudUploadOutlined } from '@ant-design/icons';

function BaseDropzone(props) {

  return (
    <Dropzone onDrop={ acceptedFiles => props.files(acceptedFiles) } multiple={ props.multiple }>
      { ({ getRootProps, getInputProps }) => (
        <section>
          <div { ...getRootProps() } className='da-text-center da-border-2 da-cursor-pointer da-p-10 da-m-10'>
            <input { ...getInputProps() } />
            <CloudUploadOutlined />
            <p>{ props.text }</p>
          </div>
        </section>
      ) }
    </Dropzone>
  )
}

export default BaseDropzone;
