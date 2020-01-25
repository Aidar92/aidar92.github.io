window.onload = () => {
    VK.init({
        apiId: 7294436
    })
}

document.getElementById('vk_auth_btn').addEventListener('click', () => {
    
    VK.Auth.login(() => {

    }, VK.access.FRIENDS)
})