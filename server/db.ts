import pkg from "pg"

const {Pool} = pkg
export const pool = new Pool({
    user: "JOHN",
    password: "Ein2Tre4",
    host: "postgres",
    port: 5432,
    database: "TESTDB"
})