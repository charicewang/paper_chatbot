const chat = document.getElementById("chat")
const input = document.getElementById("input")

let sessionId = localStorage.getItem("sessionId")

if (!sessionId) {
    sessionId = "user-" + Math.random().toString(36).substring(2)
    localStorage.setItem("sessionId", sessionId)
}

function addMessage(text, sender) {

    const msg = document.createElement("div")
    msg.className = "message " + sender

    const bubble = document.createElement("div")
    bubble.className = "bubble"
    bubble.innerText = text

    msg.appendChild(bubble)
    chat.appendChild(msg)

    chat.scrollTop = chat.scrollHeight
}

function typingIndicator() {

    const msg = document.createElement("div")
    msg.className = "message bot"

    msg.innerHTML = `<div class="bubble">Typing...</div>`
    msg.id = "typing"

    chat.appendChild(msg)
    chat.scrollTop = chat.scrollHeight
}

function removeTyping() {
    const t = document.getElementById("typing")
    if (t) t.remove()
}

async function sendMessage() {

    const text = input.value.trim()
    if (text === "") return

    addMessage(text, "user")
    input.value = ""

    typingIndicator()

    setTimeout(() => {
        removeTyping()
        addMessage(`這裡幫你挑出五篇關於生成式 AI（Generative AI）的學術論文／學術性報告，涵蓋核心技術、應用與人機互動等不同面向，適合用作研究引用：

1. Generative Artificial Intelligence: A Systematic Review and Applications
   Authors: S. S. Sengar, A. Bin Hasan, S. Kumar, F. Carroll
   Year: 2024
   Summary: 系統性整理了生成式 AI 的最新技術進展、應用範圍與未來趨勢，此文可當作理解生成式 AI 全貌的基礎文獻。

2. An HCI-Centric Survey and Taxonomy of Human‑Generative‑AI Interactions
   Authors: Jingyu Shi, Rahul Jain, Hyungjun Doh, et al.
   Year: 2023
   Summary: 從人機互動（HCI）的觀點出發，分類並分析了人類與生成式 AI 交互的設計維度與挑戰，是理解使用者與生成模型互動的重要 survey。

3. A survey of Generative AI Applications
   Authors: Roberto Gozalo‑Brizuela & Eduardo C. Garrido‑Merchán
   Year: 2023
   Summary: 提供了一份廣泛的生成式 AI 應用概覽，涵蓋文字、圖像、影片等多模態範圍，是了解生成技術現況及跨領域應用的優質參考。

4. Generative Agents: Interactive Simulacra of Human Behavior
   Authors: Joon Sung Park, Joseph C. O’Brien, et al.
   Year: 2023
   Summary: 這篇論文提出「生成式代理人」的架構，將大型語言模型延伸成具行為與記憶的互動智能體，可用於模擬與互動應用研究。

5. ChatGPT in the Age of Generative AI and Large Language Models: A Concise Survey
   Authors: Salman Mohamadi, Ghulam Mujtaba, et al.
   Year: 2023
   Summary: 簡要回顧了生成式 AI 與大型語言模型（LLMs）的演進、原理、應用及挑戰，是一篇結合 ChatGPT 與生成技術的概述文章。
`, "bot")
    }, 500)

    saveHistory()

    /**const text = input.value.trim()
    if (text === "") return

    addMessage(text, "user")
    input.value = ""

    typingIndicator()

    const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: text,
            session: sessionId
        })
    })

    const data = await res.json()

    removeTyping()

    addMessage(data.reply, "bot")

    saveHistory()*/

}

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
    }
})

function saveHistory() {

    localStorage.setItem("chatHistory", chat.innerHTML)
}

function loadHistory() {

    const history = localStorage.getItem("chatHistory")

    if (history) {
        chat.innerHTML = history
    }
}

function newChat() {

    chat.innerHTML = ""
    localStorage.removeItem("chatHistory")
}

loadHistory()
