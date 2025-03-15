class TGWorker {
    _bot_token = '7674966773:AAFfwue79okvFvMAoaCAk6nMAjgHSMgZTtw'
    _chat_id = '-4796963240'

    sendMessage(message) {
        const url = `https://api.telegram.org/bot${this._bot_token}/sendMessage?chat_id=${this._chat_id}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;
        return fetch(url).then(response => response.json())
    }

    getUserInfo() {
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            const user = tg.initDataUnsafe.user;
            if (user) {
                return {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    full_name: `${user.first_name} ${user.last_name}`
                }
            }
            return null

        }
        return null
    }
}

export default TGWorker
