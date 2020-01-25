document.getElementById('vk_auth_btn').addEventListener('click', () => {
    VK.init({
        apiId: 7294436
    })
    VK.Auth.login(() => {

    }, VK.access.FRIENDS)
})