// CRUD Tags - Duyện blogs - Duyệt tags - Duyệt course - CRUD banner - Các function Thống kê - CRUD role - user role
const db = require("../models");
const Tag = db.tag;
const Blog = db.blog
const Course = db.course
const Role = db.role
const User_role = await db.user_role
// CRUD tags
const getTag = async (req, res) => {
    try {
        const tag = await Tag.findAll();
        res.json(tag)
    } catch (error) {
        console.log(error)
    }
}
const addTag = async (req, res) => {
    try {
        const { nametag } = req.body
        const exits = await Tag.findAll({ where: { nametag } });
        if (exits) {
            res.status(202).json({ message: 'Tồn tại tag này trong hệ thống' })
        }
        else {
            await Tag.create({ nametag: nametag, status: false })
            res.status(201).json({ message: 'Thêm thành công' })
        }
    } catch (error) {
        console.log(error)
    }
}
const check_tag = async (req, res) => {
    try {
        const id = req.params.id;
        const exits = await Tag.findByPk(id);
        if (exits) {
            exits.status = true
            await exits.save();
            res.status(200).json({ message: 'Duyệt thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại tag này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}

const updateTag = async (req, res) => {
    try {
        const id = req.params.id;
        const { nametag } = req.body
        const exits = await Tag.findByPk(id);
        const exitsBlog = await Blog.findOne({ where: { id_tag: id } })
        if (exitsBlog) {
            res.status(202).json({ message: 'Tag đang dùng bởi blog, không thể cập nhập' })
        }
        if (exits) {
            exits.nametag = nametag
            await exits.save();
            res.status(200).json({ message: 'Cập nhập thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại tag này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}
const deleteTag = async (req, res) => {
    try {
        const id = req.params.id;
        const exits = await Tag.findByPk(id);
        const exitsBlog = await Blog.findOne({ where: { id_tag: id } })
        if (exitsBlog) {
            res.status(202).json({ message: 'Tag đang dùng bởi blog, không thể cập nhập' })
        }
        if (exits) {

            await exits.destroy();
            res.status(200).json({ message: 'Xóa thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại tag này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}

//  Duyện blogs
const check_blog = async (req, res) => {
    try {
        const id = req.params.id
        const exits = await Blog.findByPk(id)
        if (exits) {
            exits.status = true
            await exits.save()
            res.status(200).json({ message: 'Duyệt thành công' })

        }
        else {
            res.status(202).json({ message: 'Không tồn tại blog này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}

//  Duyện course
const check_course = async (req, res) => {
    try {
        const id = req.params.id
        const exits = await Course.findByPk(id)
        if (exits) {
            exits.status = true
            await exits.save()
            res.status(200).json({ message: 'Duyệt thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại khóa học này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}

// CRUD role 
const getRole = async (req, res) => {
    try {
        const role = await Role.findAll();
        res.json(role)
    } catch (error) {
        console.log(error)
    }
}

const addRole = async (req, res) => {
    try {
        const { name_role } = req.body
        const exits = await Role.findOne({ where: { name_role } })
        if (exits) {
            res.status(202).json({ message: "Tồn tại role này" })
        }
        else {
            await Role.create({ name_role });
            res.status(200).json({ message: 'Thêm thành công role' })
        }
    } catch (error) {
        console.log(error)
    }
}

const updateRole = async (req, res) => {
    try {
        const id = req.params.id;
        const { name_role } = req.body
        const exits = await Role.findByPk(id);
        const exitsUsed = await User_role.findAll({ where: { id_role: id } })
        if (exitsUsed) {
            res.status(202).json({ message: 'Role đang được dùng ,không thể cập nhập' })
        }
        if (exits) {
            exits.name_role = name_role
            await exits.save();
            res.status(200).json({ message: 'Cập nhập thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại role này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteRole = async (req, res) => {
    try {
        const id = req.params.id;
        const exits = await Role.findByPk(id);
        const exitsUsed = await User_role.findAll({ where: { id_role: id } })
        if (exitsUsed) {
            res.status(202).json({ message: 'Role đang được dùng ,không thể cập nhập' })
        }
        if (exits) {
            await exits.destroy()
            res.status(200).json({ message: 'Xóa thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại role này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}

// change role
const changeRole = async (req, res) => {
    try {
        const { id_role, id_user } = req.body
        const exits = await User_role.findOne({ where: { id_role, id_user } })
        if (exits) {
            exits.id_role = id_role
            exits.id_user = id_user
            exits.save()
            res.status(200).json({ message: 'Cập nhập thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại userrole này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}

const getUR = async (req, res) => {
    try {
        const UR = User_role.findAll({
            include: [
                {
                    model: Role,
                    required: true
                },
                {
                    model: User,
                    required: true
                }
            ]
        });
        res.json(UR)
    } catch (error) {
        console.log(error)
    }
}
const deleteUR = async(req,res)=>
{
    try {
        const id = req.params.id;
        const exits = await User_role.findByPk(id)
        if (exits) {
            await exits.destroy()
            res.status(200).json({ message: 'Xóa thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại role này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getTag,addTag,check_tag,updateTag,deleteTag,
    check_blog,check_course,getRole,addRole, updateRole,
    deleteRole,changeRole,getUR,deleteUR
}