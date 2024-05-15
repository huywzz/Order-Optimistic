const app = require('./src/app.js');
const PORT = process.env.PRO_APP_PORT ||3055

const server=app.listen(PORT,()=>{
    console.log(`shopJS start with http://localhost:${PORT}`);
})


