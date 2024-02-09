import React, { useEffect, useState } from 'react';
import Editor from './pages/EditorWithUseQuill';

function App() {
  const [state, setState] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  useEffect(() => {
    console.log("state", state);
  }, [state]);
  return (
    <>
      {showEditor ? (
        <Editor
          placeholder={"Write something..."}
          value={state}
          handleChange={(htmlData, jsonData) => {
            setState(htmlData);
            setShowEditor(false);
          }}
        />
      ) : (
        // <QuillEditor handleSave={(data) => setState(data)} value={state} />
        <button onClick={() => setShowEditor(true)}> show</button>
      )}
    </>
  );
}

export default App;
