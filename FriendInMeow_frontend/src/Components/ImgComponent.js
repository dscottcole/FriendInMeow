import React from "react";

const ImgComponent = (props) => {
    return (
        <div className="grid-cat">
            <img className="grid-cat-pic" key={props.key} src={props.src} alt="CatImg" />
    </div>
    )
}

export default ImgComponent