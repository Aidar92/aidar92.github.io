const getProfileInfo = ({session}) => {
    VK.Api.call('users.get', {
        user_ids: session.user.id,
        v: "5.73",
        fields: 'photo_50'
    }, r => { document.getElementById('avatar').src = r.response[0].photo_50 })
    VK.Api.call('friends.get', {
        user_ids: session.user.id,
        v: "5.73",
        fields: 'first_name,last_name'
    }, r => {
        if (r.response) {
            document.getElementById('friend-count').innerHTML = `Количество друзей:  ${r.response.count}`
            document.getElementById('friend-list').innerHTML = `                
                ${r.response.items.map(friend => `<li>${friend.first_name} ${friend.last_name}</li>`)}
            `
            document.getElementById('query').addEventListener('input', e => {
                document.getElementById('friend-list').innerHTML = r.response.items
                    .filter(item => item.first_name.toLowerCase().indexOf(e.target.value) !== -1 || item.last_name.toLowerCase().indexOf(e.target.value) !== -1)
                    .map(friend => `<li>${friend.first_name} ${friend.last_name}</li>`)
            })
        }
    })
}
window.onload = () => {
    VK.Auth.getLoginStatus(response => {
        if (response.session) getProfileInfo(response)
    })
}
document.getElementById('vk_auth_btn').addEventListener('click', () => {
    VK.Auth.login(getProfileInfo, VK.access.FRIENDS | VK.access)
})

