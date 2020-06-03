import React, {useState} from "react";
import "./ResumeItem.css"

export default function ResumeItem(props) {
    const [text, setText] = useState(props.resumeData.text);
    const [image, setImage] = useState(props.resumeData.image);
    const [title, setTitle] = useState(props.resumeData.title);
    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    }

    const handleMouseLeave = () => {
        setHover(false);
    }
    return (
        <div className={`card ${hover ? "card-hover": ""}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {!hover && <span><h3>{text}</h3>
            <p>{title}</p></span>}
            {hover && <p>{image}</p>}
        </div>
    )
}