import React, { useState } from 'react';  // ReactおよびuseStateフックをインポート
import axios from 'axios';  // APIリクエストのためのaxiosライブラリをインポート
import './App.css';  // スタイルシートをインポート

function App() {
    // ステート変数の初期化
    const [input, setInput] = useState('');  // 入力テキスト
    const [chatHistory, setChatHistory] = useState([]);  // チャットの履歴

    // 送信ボタンの処理
    const handleSend = async () => {
        if(input) {
            // 入力をチャット履歴に追加
            setChatHistory([...chatHistory, { type: 'user', text: input }]);
            try {
                // APIリクエストを送信してレスポンスを受け取る
                const response = await axios.post('http://localhost:5000/predict', { text: input });
                // ボットの返答をチャット履歴に追加
                setChatHistory([...chatHistory, { type: 'user', text: input }, { type: 'bot', text: response.data.result }]);
            } catch(error) {
                console.error("Error:", error);  // エラー時の処理
            }
            setInput('');  // 入力フィールドをクリア
        }
    }

    // チャットのUIを表示
    return (
        <div className="App">
            <div className="chatWindow">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`chatBubble ${chat.type}`}>{chat.text}</div>
                ))}
            </div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            <button onClick={handleSend}>Send</button>
        </div>
    );
}

export default App;
