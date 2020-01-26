const getProfileInfo = ({ session }) => {
    if (session) {
        document.getElementById('vk_auth_btn').innerText = 'Выйти'
        document.getElementById('query').style.display = 'block'
        document.getElementById('search_submit').style.display = 'block'
        VK.Api.call('users.get', {
            user_ids: session.mid,
            v: "5.73",
            fields: 'photo_100'
        }, r => { document.getElementById('avatar').src = r.response[0].photo_100 })
        VK.Api.call('friends.get', {
            user_ids: session.mid,
            v: "5.73",
            fields: 'first_name,last_name'
        }, r => {
            if (r.response) {
                document.getElementById('friends-count').innerHTML = `Количество друзей:  ${r.response.count}`
                document.getElementById('friends-list').innerHTML = `                
                ${r.response.items.map(friend => `<li class="friends-list-item">${friend.first_name} ${friend.last_name}</li>`).join("")}
            `
                document.getElementById('search_submit').addEventListener('click', () => {
                    const search_value = document.getElementById('query').value
                    document.getElementById('friends-list').innerHTML = r.response.items
                        .filter(item => item.first_name.toLowerCase().indexOf(search_value.toLowerCase()) !== -1 || item.last_name.toLowerCase().indexOf(search_value.toLowerCase()) !== -1)
                        .map(friend => `<li class="friends-list-item">${friend.first_name} ${friend.last_name}</li>`).join("")
                })
            }
        })        
    } else {
        document.getElementById('query').style.display = 'none'
        document.getElementById('search_submit').style.display = 'none'
    }
}
window.onload = () => {
    VK.Auth.getLoginStatus(getProfileInfo)
}
document.getElementById('vk_auth_btn').addEventListener('click', () => {
    if (document.getElementById('vk_auth_btn').innerText === 'Войти')
        VK.Auth.login(getProfileInfo, VK.access.FRIENDS | VK.access)
    else VK.Auth.logout(() => {
        document.getElementById('vk_auth_btn').innerText = 'Войти'
        document.getElementById('avatar').src = ''
        document.getElementById('friends-list').innerHTML = ''
        document.getElementById('friends-count').innerHTML = ''
        document.getElementById('query').style.display = 'none'
        document.getElementById('search_submit').style.display = 'none'
    })
})

