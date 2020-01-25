

document.getElementById('vk_auth_btn').addEventListener('click', () => {
    
    VK.Auth.login(() => {

    }, VK.access.FRIENDS)
})