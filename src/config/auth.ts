export default {
    jwt: {
        secret: process.env.APP_SECRET || 'ultra-secret-key',
        expiresIn: '1d',
    },
};
