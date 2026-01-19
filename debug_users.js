
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

async function checkUsers() {
  try {
    // Read MONGODB_URI from .env.local manually
    const envFile = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8');
    const uriMatch = envFile.match(/MONGODB_URI=(.*)/);
    const mongoUri = uriMatch ? uriMatch[1] : null;

    if (!mongoUri) {
      console.error('MONGODB_URI not found in .env.local');
      return;
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Define a loose schema to see all fields
    const userSchema = new mongoose.Schema({}, { strict: false });
    const User = mongoose.model('User', userSchema, 'users');

    const users = await User.find({});
    console.log(`Found ${users.length} users`);

    users.forEach(u => {
      console.log('User:', u.email);
      console.log('  linkedAccounts:', JSON.stringify(u.linkedAccounts, null, 2));
      console.log('  externalAccounts (legacy):', JSON.stringify(u.externalAccounts, null, 2));
      console.log('  cfVerified (legacy):', u.cfVerified);
      console.log('  rollNumber:', u.rollNumber);
      console.log('-------------------');
    });

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

checkUsers();
