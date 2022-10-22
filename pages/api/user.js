import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../../prisma/user";

export default async function handle(req, res) {
  try {
    switch (req.method) {
      case "GET": {
        if (req.query.id) {
          const user = await getUserById(req.query.id);
          res.status(200).json(user);
        } else {
          const users = await getAllUser();
          res.status(200).json(users);
        }
        break;
      }
      case "POST": {
        const { email, name, birthYear } = req.body;
        const user = await createUser(email, name, birthYear);
        res.status(200).json(user);
        break;
      }
      case "PUT": {
        const { id, updateData } = req.body;
        const user = await updateUser(id, updateData);
        res.status(200).json(user);
        break;
      }
      case "DELETE": {
        const { id } = req.body;
        const user = await deleteUser(id);
        res.status(200).json(user);
        break;
      }
      default:
        res.status(405).json({ message: "Method not allowed" });
        break;
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
