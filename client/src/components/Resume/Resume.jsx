import React, {useState} from "react";
import ResumeItem from "../ResumeItem/ResumeItem"
import "./Resume.css"
export default function Resume() {
    const items_arr = [
    {
        text: "Resume item 1",
        image: "Image 1",
        title: "Title 1"
    },
    {
        text: "Resume item 2",
        image: "Image 2",
        title: "Title 2"
    },
    {
        text: "Resume item 3",
        image: "Image 3",
        title: "Title 3"
    },
    {
        text: "Resume item 4",
        image: "Image 4",
        title: "Title 4"
    },
    {
        text: "Resume item 5",
        image: "Image 5",
        title: "Title 5"
    },
    {
        text: "Resume item 6",
        image: "Image 6",
        title: "Title 6"
    }
]
    const [items, setItems] = useState(items_arr);
    return (
        <div className="card-container">
        {items.map((i) => {
            return <ResumeItem resumeData={i} />
        })
        }
        </div>
    )
}