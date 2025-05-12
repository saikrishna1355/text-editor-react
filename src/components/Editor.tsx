"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  FaBold,
  FaItalic,
  FaListUl,
  FaLink,
  FaParagraph,
} from "react-icons/fa";
import { LuHeading1, LuHeading2 } from "react-icons/lu"; // Importing LuHeading1 and LuHeading2 from Lucide

import DOMPurify from "dompurify";

const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [htmlCode, setHtmlCode] = useState<string>("");

  // When typing into contentEditable (normal text), update HTML code
  const handleEditorInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setHtmlCode(content);
    }
  };

  // When typing HTML code, render it as output in contentEditable
  const handleCodeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const html = e.target.value;
    setHtmlCode(html);
    if (editorRef.current) {
      editorRef.current.innerHTML = html;
    }
  };

  // Format the content in the contentEditable div
  const format = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  // On first load
  useEffect(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setHtmlCode(content);
    }
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      {/* Box 1: Rich Text / Rendered HTML */}
      <div>
        <h2>Rendered HTML</h2>
        <div style={{ marginBottom: "1rem" }}>
          <button
            onClick={() => format("formatBlock", "<p>")}
            style={buttonStyle}
          >
            <FaParagraph />
          </button>
          <button onClick={() => format("bold")} style={buttonStyle}>
            <FaBold />
          </button>
          <button onClick={() => format("italic")} style={buttonStyle}>
            <FaItalic />
          </button>
          <button
            onClick={() => format("insertUnorderedList")}
            style={buttonStyle}
          >
            <FaListUl />
          </button>
          <button
            onClick={() => format("formatBlock", "<h1>")}
            style={buttonStyle}
          >
            <LuHeading1 />
          </button>
          <button
            onClick={() => format("formatBlock", "<h2>")}
            style={buttonStyle}
          >
            <LuHeading2 />
          </button>
          <button
            onClick={() => format("createLink", "https://www.example.com")}
            style={buttonStyle}
          >
            <FaLink />
          </button>
        </div>

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleEditorInput}
          style={{
            border: "1px solid #ccc",
            minHeight: "200px",
            padding: "1rem",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        />
      </div>

      {/* Box 2: HTML Code View */}
      <div>
        <h2>HTML Code</h2>
        <textarea
          value={htmlCode}
          onChange={handleCodeInput}
          placeholder="Write or paste HTML here..."
          style={{
            width: "100%",
            minHeight: "200px",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontFamily: "monospace",
            backgroundColor: "#fdfdfd",
          }}
        />
      </div>
    </div>
  );
};

// Styling for buttons
const buttonStyle = {
  backgroundColor: "#f4f4f4",
  border: "none",
  borderRadius: "8px",
  padding: "10px",
  margin: "5px",
  cursor: "pointer",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
};

export default Editor;
