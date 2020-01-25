

document.getElementById('vk_auth_btn').addEventListener('click', () => {
    
    VK.Auth.login(({session}) => {
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
                document.getElementById('query').addEventListener('change', e => {
                    document.getElementById('friend-list').innerHTML = r.response.items.filter(item => item.first_name.indexOf(e.target.value) !== -1 || item.last_name.indexOf(e.target.value) !== -1)
                })
            }
        })
    }, VK.access.FRIENDS | VK.access)
})