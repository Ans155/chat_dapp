import React from 'react'
import Style from "./error.module.css";
const Error = ({error}) => {
  return (
    <div className={Style.Error}>
      <div className={Style.Error_box}>
        <h1>
          Please Fix this Error and Reload!
        </h1>
        {error}
      </div>

    </div>
  )
}

export default Error