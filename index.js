

document.getElementById('vk_auth_btn').addEventListener('click', () => {
    
    VK.Auth.login(({session}) => {
        console.log(session.user.id)
        VK.Api.call('friends.get', {
            user_ids: session.user.id,
            v: "5.73",
            fields: 'first_name,last_name'
        }, r => {
            console.log(r)
            if (r.response) {
                document.getElementById('friend-list').innerHTML = `
                Количество друзей  ${r.response.count}
                ${r.response.items.map(friend => `<li>${friend.first_name} ${friend.last_name}}`)}
                `

            }
        })
    }, VK.access.FRIENDS | VK.access)
})