import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './stylesheet.css';

// const mathjaxPlugin = createMathjaxPlugin(/* optional configuration object */);

class RichText extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  render() {

    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="ui-richtext"

          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

export default RichText;