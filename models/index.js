//import model files
const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');
//Relating User to Blog
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
//Relating Blog to User
Blog.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
//Relating User to Comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
//Relating Blogs to Comments
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});
//Relating Comments to Users
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});
//Relating Comments to Blogs
Comment.belongsTo(Blog, {
  foreignKey: 'blog_id'
});
//export model relational data
module.exports = { User, Blog, Comment };