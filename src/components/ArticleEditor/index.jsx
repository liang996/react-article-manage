import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./index.module.css";

export default class Welcome extends Component {
  state = {
    formats : [
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image',
    ],
    modules: {
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }], //字体设置
          [
            {
              color: [],
            },
          ],
          [
            {
              background: [],
            },
          ],
          [{ font: [] }],
          [{ align: [] }],
          ["link", "image"], // a链接和图片的显示
        ],
      },
    },
  };

  render() {
    const { modules,formats } = this.state;

    return (
        <ReactQuill
          value={this.props.value}
          theme="snow"
          modules={modules}
          formats={formats}
          className={styles.editContainer}
          onChange={this.props.onValueChange}
        />
    );
  }
}
