import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import BlotFormatter from "quill-blot-formatter";
import "quill/dist/quill.snow.css";
import "./../index.css";

const Editor = ({ value, handleChange }) => {
  const { quill, quillRef, Quill } = useQuill({
    modules: {
      blotFormatter: {},
    },
  });

  if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
    Quill.register("modules/blotFormatter", BlotFormatter);
  }

  useEffect(() => {
    if (quill) {
      // quill.setContents(value);
      // quill.clipboard.pasteHTML(0, value);
      // quill.clipboard.dangerouslyPasteHTML(0, value);
      quill.root.innerHTML = value;
      quill.on("text-change", (delta, oldContents) => {
        console.log("Text change!");
        let currrentContents = quill.getContents();
        console.log(currrentContents.diff(oldContents));
      });
    }
  }, [quill, Quill]);

  return (
    <div>
      <div ref={quillRef} />
      <button
        onClick={() => handleChange(quill.root.innerHTML, quill.getContents())}
      >
        save
      </button>
    </div>
  );
};

export default Editor;
