# ⚡ MongoDB & Mongoose Quick Reference Cheat Sheet

## Mongoose Queries
```javascript
// Create
const user = await User.create({ name, email, password });

// Read
const user = await User.findById(id).select('-password');
const courses = await Course.find({ category: 'react' }).populate('instructor');

// Update
const updated = await User.findByIdAndUpdate(id, { name }, { new: true });

// Delete
await Course.findByIdAndDelete(id);
```
