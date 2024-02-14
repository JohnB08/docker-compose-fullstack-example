import pkg from "pg"

const {Pool} = pkg
export const pool = new Pool({
    user: "JOHN",
    password: "Ein2Tre4",
    host: "0.0.0.0",
    port: 5432,
    database: "TESTDB"
})