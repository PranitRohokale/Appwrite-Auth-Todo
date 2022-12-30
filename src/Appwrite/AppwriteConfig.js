import { Client, Databases, Account } from "appwrite"

const client = new Client()

client.setEndpoint("http://localhost/v1").setProject("63aed0a7ebf28f51de98")

export const account = new Account(client)

export const database = new Databases(client)