const apiMessage = {
    registerSuccess: 'Register Success! Please activate your email to start.',
    loginSuccess: 'Login success!',
    activeAcccount: 'Account has been activated',
    sendMail: 'Re-send the password, please check your email.',
    resetPasswordSuccess: 'Password successfully changed!',
    updateUser: 'Update success!',
}

const notificationMessage = {
    createOrder: 'Đơn hàng của bạn vừa được tạo',
    verifiedOrder: 'Đơn hàng của bạn đã được xác nhận bởi nhà hàng',
    waitingOrder: 'Đơn hàng của bạn đang được thực hiện',
    processingOrder: 'Đơn hàng của bạn đang được giao',
    completedOrder: 'Đơn hàng của bạn đã giao thành công',
    cancelledOrder: 'Đơn hàng của bạn đã bị huỷ',
}

module.exports = {
    apiMessage,
    notificationMessage,
}
