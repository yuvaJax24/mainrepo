import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import BlotFormatter from "quill-blot-formatter";
import ImageResize from "quill-image-resize-module";
import "quill-image-resize-module/dist/Resize.css";

const QuillEditor = ({ handleSave, value }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current && Quill) {
      const quill = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["link", "image", "video"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            ["clean"],
            // ["save"],
          ],
          blotFormatter: {},
          // imageResize: {
          //   displaySize: true,
          // },
          // handlers: {
          //   save: () => {
          //     console.log("Editor content:", quill.root.innerHTML);
          //     //   handleSave(quill.root.innerHTML);
          //   },
          // },
        },
        placeholder: "Write something...",
      });
      if (Quill) {
        // const BlotFormatter = require('quill-blot-formatter');
        Quill.register("modules/imageResize", ImageResize);
      }
      if (value) {
        quill.root.innerHTML = value;
      }
      // Listen to editor changes
      quill.on("text-change", () => {
        console.log("Editor content:", quill.root.innerHTML);
        handleSave(quill.root.innerHTML);
      });
      // Custom image handler
      const handleImageUpload = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          const reult = reader.readAsDataURL(file);
          console.log(reult);
        });
      };

      // Override default image handler
      quill.getModule("toolbar").addHandler("image", () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
          const file = input.files[0];
          const imageUrl = await handleImageUpload(file);
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index ? range.index : 0, "image", imageUrl);
        };
      });
    }
  }, []);

  return <div ref={quillRef} style={{ height: "400px" }} />;
};

export default QuillEditor;
