import FileUploadForm from "./Form.jsx";

function Content() {
    return (
        <div className={"content"}>
            <div className={"content-info"}>
                <div className={"content-title"}>One-Click <span className={"contrast"}>Text Analysis</span></div>
                <div className={"content-subtitle"}><b>Calculate letters, words, symbols and custom file base </b><br/>Just upload a file for analyse</div>
                <div className={"buttons"}>
                    <div className={"api-button"}><a href={"http://46.173.24.204:8080/swagger/index.html"}>API Documentation</a></div>
                    <div className={"github-button"}><a href={"https://github.com/mikaeloganesian/HSEHelper"}>GitHub Repository Link</a></div>
                </div>
            </div>
            <FileUploadForm/>
        </div>
    )
}

export default Content