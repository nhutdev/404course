Table users
{
  id integer [primary key]
  username varchar
  fullname varchar
  password varchar
  email varchar
  avatar varchar
  avatar_name varchar
  createdAt date
}
# USERS: npx sequelize-cli model:generate --name user --attributes username:string,email:string,password:string,avatar:string,avatar_name:string,fullname:string

Table role{
  id integer [primary key]
  name_role varchar
}
# ROLE: npx sequelize-cli model:generate --name role --attributes name_role:string
Table user_role
{
  id integer
  id_user integer
  id_role integer
}
# USER_ROLE: npx sequelize-cli model:generate --name user_role --attributes id_user:integer,id_role:integer

Table reset_password
{
  id integer 
  id_user id
  token_reset varchar
  createdAt date
}
# node_cron
# RESET_PASSWORD: npx sequelize-cli model:generate --name reset_password --attributes id_user:integer,token_reset:string

Table courses
{
  id integer [primary key]
  id_user id
  title_course varchar
  description_course varchar
  color_course varchar
  status boolean
  createdAt date
}
# COURSES: npx sequelize-cli model:generate --name course --attributes id_user:integer,title_course:string,description_course:string,color_course:string,status:boolean

Table save_course
{
  id integer
  id_course id
  id_user id
}
# SAVE_COURSES: npx sequelize-cli model:generate --name save_course --attributes id_user:integer,id_course:integer

Table index_course
{
  id integer
  id_course integer
  title_index varchar
  description_index varchar
}
# INDEX_COURSE: npx sequelize-cli model:generate --name index_course --attributes id_course:integer,title_index:string,description_index:string
Table content_index_course
{
  id integer
  id_index integer
  title_content varchar
  description_content varchar
  type enum 
  link_video varchar 
}
# CONTENT_INDEX_COURSE: npx sequelize-cli model:generate --name content_index_course --attributes id_index:integer,title_content:string,description_content:string,type:enum,link_video:string

Table question_course
{
  id integer
  id_course integer
  id_user integer
  reply_id integer
  content_question varchar
  createdAt date
}
# QUESTION_COURSE: npx sequelize-cli model:generate --name question_course --attributes id_course:integer,content_question:string,id_user:integer

Table tags
{
  id integer [primary key]
  nametag varchar
  status boolean
  createdAt date
}
# TAGS: npx sequelize-cli model:generate --name tag --attributes nametag:string,status:boolean
Table blogs
{
  id integer [primary key]
  id_tag integer
  id_user integer
  title_blog varchar
  content_blog varchar
  status boolean
  createdAt date
}
# BLOGS: npx sequelize-cli model:generate --name blog --attributes id_user:integer,title_blog:string,content_blog:string,id_tag:integer,status:boolean 

Table like_blog
{
  id integer
  id_blogs integer
  id_user integer
}
# LIKE_BLOG: npx sequelize-cli model:generate --name like_blog --attributes id_user:integer,id_blog:integer
Table save_blog
{
  id integer
  id_blogs integer
  id_user integer
}
# SAVe_BLOG: npx sequelize-cli model:generate --name save_blog --attributes id_user:integer,id_blog:integer
Table comment_blog
{
  id integer
  id_blogs integer
  id_user integer
  reply_id integer
  comment varchar
}
# Comment_BLOG: npx sequelize-cli model:generate --name comment_blog --attributes id_user:integer,id_blog:integer,reply_id:integer,comment:string

Table notification_course
{
  id integer
  content_notification_course varchar
  id_course integer
  id_user integer
  status_seen boolean
  createdAt date
}
# NOTIFICATION_COURSE: npx sequelize-cli model:generate --name notification_course --attributes id_user:integer,id_course:integer,content_notification_course:string,status_seen:boolean

Table follow_user
{
  id integer
  to_user integer
  from_user integer
}
# FOLLOW_USER: npx sequelize-cli model:generate --name follow_user --attributes to_user:integer,from_user:integer
Table Notes{
  id integer [primary key]
  title_note varchar
  content_note varchar
  id_user integer
}
# NOTE: npx sequelize-cli model:generate --name note --attributes  title_note:string,content_note:string,id_user:integer

Table Note_img
{
  id integer
  id_node integer
  img_url varchar
  img_name varchar
}
# NOTE_IMG: npx sequelize-cli model:generate --name note_img --attributes  img_url:string,img_name:string,id_note:integer
Table banner
{
  id integer
  title_banner varchar
  img_url varchar
  img_name varchar
}
# BANNER: npx sequelize-cli model:generate --name banner --attributes  img_url:string,img_name:string,title_banner:string

Table notification_user
{
  id integer [primary key]
  id_user integer
  title_notification varchar
  content_notification varchar
  status_seen boolean
  createdAt date
}
# notification_user: npx sequelize-cli model:generate --name notification_user --attributes id_user:integer,title_notification:string,content_notification:string,status_seen:boolean
