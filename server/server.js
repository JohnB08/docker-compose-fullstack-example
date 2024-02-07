import { createServer } from "http";

const host = "localhost";
const port = 3000;

const server = createServer((request, response) => {
  response.statusCode = 200;
  response.end("Hello\n");
});

server.listen(port, () => {
  console.log(`Server listening on http://${host}:${port}`);
});

const shutdown = () => {
  console.log("Shutting down server");
  server.close();
  process.exit();
};

process.addListener("SIGINT", shutdown);
process.addListener("SIGTERM", shutdown);
