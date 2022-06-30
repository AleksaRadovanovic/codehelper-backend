module.exports = {
    port: process.env.PORT || 5000,
    db: {
        user: 'postgres',
        host: 'localhost',
        database: 'codehelper',
        password: 'postgres',
        port: 5432,
    },
    serverSecretKey : 'AAAAB3NzaC1yfhausAHISAHDKA4rGOpVYmfUYZ8FATEKnULhoBV6G7jXoib9',
};
  