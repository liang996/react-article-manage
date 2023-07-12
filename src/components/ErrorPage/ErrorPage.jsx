import React, { Component } from "react";
import styleModule from "./ErrorPage.module.scss";

export default class ErrorPage extends Component {
  render() {
    return (
    
      <div className={styleModule.father}>
        <div className={styleModule.son}><span style={{fontSize:"20px"}}>404</span>您访问的页面不存在！</div>
      </div>
    );
  }
}
