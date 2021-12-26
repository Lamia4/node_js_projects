import bcrypt from "bcrypt";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

let i = 2;
const fileUserData = process.argv[i++];
const userParam = process.argv[i++];
const passParam = process.argv[i++];

const users = JSON.parse(
	fs.readFileSync(fileUserData, 'utf-8') // lesen der Datei
); // Parsen des gelesenen JSONs um ein Objekt zu erhalten

// generiere neues Passwort:
// const SALT_ROUNDS = 12;
// const newBcrypt = bcrypt.hashSync(passParam, SALT_ROUNDS);
//console.log("newBcrypt", newBcrypt);

const isAuthenticated = bcrypt.compareSync(passParam, users[userParam].bcrypt);

// passParam = req.body.password , users[userParam] = 
if (isAuthenticated) {
	console.log("authentication success");
} else {
	console.log("authentication failed");
}