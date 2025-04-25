const orderService = {
    createOrder: async (item) => {
        try {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({success: true, item, orderId: Math.floor(Math.random() * 100000)}); // Mock Order API
                }, 100);
            });
        } catch (err) {
            throw err;
        }
    }
};

module.exports = orderService;