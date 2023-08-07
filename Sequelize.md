# USERS: npx sequelize-cli model:generate --name user --attributes username:string,email:string,password:string,avatar:string,avatar_name:string,role:enum

# RESET_PASSWORD: npx sequelize-cli model:generate --name reset_password --attributes id_user:integer,token_reset:string

# COURSES: npx sequelize-cli model:generate --name course --attributes id_user:integer,title_course:string,description_course:string,color_course:string

# INDEX_COURSE: npx sequelize-cli model:generate --name index_course --attributes id_course:integer,title_index:string,description_index:string

# CONTENT_INDEX_COURSE: npx sequelize-cli model:generate --name content_index_course --attributes id_index:integer,title_content:string,description_content:string,type:enum,link_video:string

# QUESTION_COURSE: npx sequelize-cli model:generate --name question_course --attributes id_course:integer,content_question:string,id_user:integer

# BLOGS: npx sequelize-cli model:generate --name blog --attributes id_user:integer,title_blog:string,content_blog:string

# LIKE BLOG: npx sequelize-cli model:generate --name like_blog --attributes id_user:integer,id_blog:integer

# COMMENT BLOG: npx sequelize-cli model:generate --name comment_blog --attributes id_user:integer,id_blog:integer,comment:string
