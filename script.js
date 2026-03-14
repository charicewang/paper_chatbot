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
        addMessage("哈囉", "bot")
    }, 500)

    saveHistory()

    /*    const text = input.value.trim()
        if (text === "") return
    
        addMessage(text, "user")
        input.value = ""
    
        typingIndicator()
    
        const res = await fetch("YOUR_BACKEND_URL/chat", {
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