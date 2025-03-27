import 'dotenv/config'; // alternative: node -r dotenv/config initDB.js
import readline from 'node:readline'
import connectMongoose from './lib/connectMongoose.js'
import Product from './models/Product.js'
import User from './models/User.js'
import mongoose from 'mongoose';


const connection = await connectMongoose()
console.log('Connect to MongoDB:', connection.name)

const questionResponse = await ask('Are you sure you want to empty the database and create initial data?')
if(questionResponse.toLowerCase() !== 'yes') {
    console.log('Operation aborted')
    process.exit()
}

await initUsers()
await initProducts()
await mongoose.connection.close()




async function initProducts() {
    // delete all agents
    const deleteResult = await Product.deleteMany()
    console.log(`Deleted ${deleteResult.deletedCount} products`)

    const [admin, user1] = await Promise.all([
        User.findOne({ name: 'admin'}),
        User.findOne({ name: 'user1'}),
    ])

    // create initiala Products
    const insertResult = await Product.insertMany([
        { name: 'Bicicleta',  price: 23015, image: 'bici.jpg', owner: admin._id, tags: [ 'lifestyle', 'motor'] },
        { name: 'Iphone',     price: 5000,  image: 'iphone.png', owner: admin._id, tags: [ 'lifestyle', 'mobile'] },
        { name: 'Zapatillas', price: 2000,  image: 'zapas.jpg', owner: user1._id, tags: [ 'lifestyle'] }
    ])
    console.log(`Created ${insertResult.length} products.` )
}

async function initUsers() {
    // delete all Users
    const deleteResult = await User.deleteMany()
    console.log(`Deleted ${deleteResult.deletedCount} users`)
    // create initiala Users
    
    const insertResult = await User.insertMany([
        { name: 'admin', email: 'admin@example.com', password: await User.hashPassword('1234')},
        { name: 'user1', email: 'user1@example.com', password: await User.hashPassword('1234')},
    ])
    console.log(`Created ${insertResult.length} users.` )
}
function ask(questionText){
    return new Promise((resolve, reject) =>{ 
        const consoleInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        consoleInterface.question(questionText, answer => {
            consoleInterface.close()
            resolve(answer)
        })
    })
}
