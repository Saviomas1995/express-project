import express, { Request, Response } from "express";
import { connectDB } from "./db/connect";
import { Employee } from "./model/employee";
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express");
});

app.delete("/employee/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Employee.findByIdAndDelete(id);
    res.send("Successfully deleted");
  } catch (e) {
    console.log(e);
  }
});

app.put("/employee/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const update = req.body;
    await Employee.findByIdAndUpdate(id, update);
    res.send(update);
  } catch (e) {
    console.log(e);
  }
});

app.get("/employee", async (req: Request, res: Response) => {
  try {
    const employee = await Employee.find({}, { __v: 0 });
    res.send(employee);
  } catch (e) {
    console.log(e);
  }
});

app.post("/employee", (req: Request, res: Response) => {
  try {
    const data = req.body;
    const employee = new Employee(data);
    employee
      .save()
      .then(() => res.status(201).send(employee))
      .catch((e) => res.status(400).send(e));
  } catch (e) {
    console.log(e);
  }
});

const startServer = async () => {
  try {
    const response = await connectDB();
    if (response) {
      console.log("Connection successful");
    }
    app.listen(5000, () => {
      console.log("App listening on port 5000!");
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
