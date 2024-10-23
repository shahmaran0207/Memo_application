const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Since2018@',
    connectionLimit: 5,
    database: 'memo'
});

module.exports = {
    async run(query, params) {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    conn.query(query, params)
                        .then((rows) => {
                            resolve(rows);
                            conn.end(); // (필수) connection 종료
                        })
                        .catch(err => {
                            console.log(err);
                            conn.end(); // (필수) connection 종료
                            reject(err);
                        })

                }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    }
}