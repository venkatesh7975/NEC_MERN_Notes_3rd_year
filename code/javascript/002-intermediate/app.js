// 002 Intermediate Async/Await Promises Example

const mockDatabase = [
  { id: 'usr-101', name: 'Alice Johnson', role: 'student', progress: 85 },
  { id: 'usr-102', name: 'Bob Smith', role: 'instructor', progress: 100 }
];

function fetchUserById(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockDatabase.find(u => u.id === userId);
      if (user) resolve(user);
      else reject(new Error(`User with ID ${userId} not found`));
    }, 500);
  });
}

async function runAsyncWorkflow() {
  console.log('Fetching user profile...');
  try {
    const user = await fetchUserById('usr-101');
    console.log(`[SUCCESS] User loaded: ${user.name} (${user.role}) - Progress: ${user.progress}%`);
  } catch (err) {
    console.error('[ERROR]', err.message);
  }
}

runAsyncWorkflow();
