import { mongoose } from "@typegoose/typegoose"

let TodoDatabaseConnection: mongoose.Connection | null = null

function connect(): mongoose.Connection {
  try {
    const connection = mongoose.createConnection("mongodb+srv://gx810:ehdrjs12@whyscluster.15gd5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

    connection.set("useFindAndModify", false)

    connection.setMaxListeners(100)

    TodoDatabaseConnection = connection
    console.log("DB CONNECTED...")

    return connection
  } catch (e: any) {
    throw e
  }
}

function disconnect() {
  if (TodoDatabaseConnection) {
    TodoDatabaseConnection.close()
    TodoDatabaseConnection.removeAllListeners()
  }
}

export interface IDatabase {
    connect: () => mongoose.Connection;
    disconnect: () => void;
    getConnection: () => mongoose.Connection;
}

const TodoDatabase: IDatabase = {
  "connect": connect,
  "disconnect": disconnect,
  "getConnection": () => {
    if (!TodoDatabaseConnection) {
      return connect()
    }
    return TodoDatabaseConnection
  }
}

export default TodoDatabase
