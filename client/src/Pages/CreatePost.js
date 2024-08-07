import { useState } from "react";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';

const modules = {
toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
],
}

const formats = [
'header',
'bold', 'italic', 'underline', 'strike', 'blockquote',
'list', 'bullet', 'indent',
'link', 'image'
]


export default function CreatePost(){
    const [title,setTitle] = useState('')
    const [summary,setSummary] = useState('')
    const [content,setContent] = useState('')
    const [file,setFile] = useState()

    async function createNewPost(e){
        const data = new FormData()
        data.set('title',title)
        data.set('summary',summary)
        data.set('content',content)
        data.set('file',file[0])
        console.log(file[0])
        e.preventDefault()
        const response = await fetch('http://localhost:4000/post/create',{
            method: "POST",
            body: data
        })
    }

    return (
        <form onSubmit={createNewPost}>
            <input type="title" 
                   placeholder="Title"
                   value={title}
                   onChange={ev => setTitle(ev.target.value)}></input>
            <input type="summary" 
                   placeholder="Summary" 
                   value={summary}
                   onChange={ev => setSummary(ev.target.value)}></input>
            <input type="file" 
                   onChange={ev => setFile(ev.target.files)}></input>
            <ReactQuill value={content} 
                        modules={modules} 
                        formats={formats}
                        onChange={newValue => setContent(newValue)}/>
            <button style={{marginTop:'5px'}}>Create Post</button>
        </form>
    )
}