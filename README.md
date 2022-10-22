This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```


Setup Prisma: 

```npm install --dev prisma```
```npx prisma init```
* Update DB url in .env file.
* Inside schema.prisma, add `previewFeatres = ["mongoDb"]` to `client` and change `provider` to `"mongodb"`

- Add this to schema.prisma file.
```
model User {
  id  String  @id @default(auto()) @map("_id") @db.ObjectId
  email String? @unique
  name String
  birthYear Int?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

```

Now try to push this to the database:

`npx prisma db push`

To launch prisma in localhost

`npx prisma studio`

Now we can install prisma client:

`npm install @prisma/client`
`npx prisma generate`

Add `prisma.js` inside prisma folder and put the following link:

```javascript

import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;


```

Now lets add some ORM functionality:

```javascript

import prisma from "./prisma";

export const getAllUser = async () => {
  return await prisma.user.findMany();
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const createUser = async (email, name, birthYear) => {
  return await prisma.user.create({
    data: {
      email,
      name,
      birthYear,
    },
  });
};

export const updateUser = async (id, updateData) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: updateData,
  });
};

export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};


```

Inside api folder we can add `user.js` and paste the following code:

```javascript

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



```
