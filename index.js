

document.getElementById('vk_auth_btn').addEventListener('click', () => {
    
    VK.Auth.login(({session}) => {
        console.log(session.user.id)
    }, VK.access.FRIENDS | VK.access)
})