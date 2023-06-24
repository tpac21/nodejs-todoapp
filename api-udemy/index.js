const express = require("express");
const app = express();

const PORT = 5000;
app.use(express.json());

app.listen(PORT, () => console.log("server is running"));

app.get("/", (req, res) => {
  res.send("Udemy");
});

const customers = [
  { title: "Tanaka", id: 1 },
  { title: "Saitou", id: 2 },
  { title: "Hashimoto", id: 3 },
  { title: "Suzuki", id: 4 },
  { title: "Andou", id: 5 },
];

app.get("/api/customers", (req, res) => {
  res.send(customers);
});

app.post("/api/customers", (req, res) => {
  const customer = {
    title: req.body.title,
    id: customers.length + 1,
  };
  customers.push(customer);
  res.send(customer);
});

app.put("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  customer.title = req.body.title;
  res.send(customer);
});

app.delete("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));

  const index = customers.indexOf(customer);
  customers.splice(index, 1);

  res.send(customer);
});
