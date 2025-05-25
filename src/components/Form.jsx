import React, { useState } from 'react';

const FileUploadForm = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setAnalysisResult(null); // Сбрасываем предыдущие результаты при выборе нового файла
            setError(null);
        }
    };

    const handleAnalyze = async () => {
        if (!file) {
            alert('Please upload a file first!');
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://46.173.24.204:8080/upload', {
                method: 'POST',
                body: formData,
                // Не нужно устанавливать Content-Type вручную для FormData
                // Браузер автоматически установит правильный заголовок с boundary
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const data = await response.json();
            setAnalysisResult(data);
        } catch (err) {
            console.error('Error uploading file:', err);
            setError('Failed to analyze file. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form">
            <h2 className="form-label">Upload your file here</h2>
            <div className="upload-section">
                <h3>{file && <p>Selected file: {file.name}</p>}</h3>
                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                    <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="auto" viewBox="0 0 27 22" fill="none">
                        <g clipPath="url(#clip0_4_45)">
                            <path
                                d="M12 14.6562H14.6875V6.65625H18.6875L13.3438 0L8 6.65625H12V14.6562ZM24 18.6562H2.6875V9.3125H0V18.6562C0 19.3854 0.260414 20.0104 0.78125 20.5312C1.30209 21.0521 1.9375 21.3125 2.6875 21.3125H24C24.75 21.3125 25.3854 21.0521 25.9062 20.5312C26.4271 20.0104 26.6875 19.3854 26.6875 18.6562V9.3125H24V18.6562Z"
                                fill="#DADADA"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_4_45">
                                <rect width="26.6875" height="21.3125" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

            </div>

            <button
                className="analyze-button"
                onClick={handleAnalyze}
                disabled={isLoading || !file}
            >
                {isLoading ? 'Analyzing...' : 'Analyze File'}
            </button>

            {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}

            <div className="line"></div>
            <div className="stats-list">
                <li>
                    <div className="stats-title"><span className="icon">Ⓐ</span> Characters</div>
                    <div className="value">
                        {analysisResult ? analysisResult.analysis.characters : '-'}
                    </div>
                </li>
                <li>
                    <div className="stats-title"><span className="icon">¶</span> Paragraphs</div>
                    <div className="value">
                        {analysisResult ? analysisResult.analysis.paragraphs : '-'}
                    </div>
                </li>
                <li>
                    <div className="stats-title"><span className="icon">T</span> Words</div>
                    <div className="value">
                        {analysisResult ? analysisResult.analysis.words : '-'}
                    </div>
                </li>
                <li>
                    <div className="stats-title"><span className="icon">©</span> Hash detected</div>
                    <div className="value">
                        {analysisResult ? (analysisResult.analysis.is_plagiarized ? 'Yes' : 'No') : '-'}
                    </div>
                </li>
            </div>
        </div>
    );
};

export default FileUploadForm;