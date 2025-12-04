import User from "./models/user";

async function init() {
    const isDev = false;
    await User.sync({ alter: isDev });
}

function dbInit() {
    init()
}

export default dbInit;