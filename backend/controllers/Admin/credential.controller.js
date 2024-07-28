const adminCredential = require("../../models/Admin/credential.model.js");
const bcrypt = require('bcrypt');
const loginHandler = async (req, res) => {
    let { loginid, password } = req.body;
    try {
      let user = await adminCredential.findOne({ loginid });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Wrong Credentials" });
      }
      const isPasswordMatch = await bcrypt.compare(password.toString(), user.password);
      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Wrong Credentials" });
      }
      res.json({
        success: true,
        message: "Login Successfull!",
        loginid: user.loginid,
        id: user._id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  

const registerHandler = async (req, res) => {
    let { loginid, password } = req.body;
    try {
      let user = await adminCredential.findOne({ loginid });
      if (user) {
        return res.status(400).json({
          success: false,
          message: "Admin With This LoginId Already Exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password.toString(), 10);
      user = await adminCredential.create({
        loginid,
        password: hashedPassword,
      });
      res.json({
        success: true,
        message: "Register Successfull!",
        loginid: user.loginid,
        id: user._id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

const updateHandler = async (req, res) => {
    try {
        let user = await adminCredential.findByIdAndUpdate(req.params.id, req.body);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Admin Exists!",
            });
        }
        const data = {
            success: true,
            message: "Updated Successfull!",
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteHandler = async (req, res) => {
    try {
        let user = await adminCredential.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Admin Exists!",
            });
        }
        const data = {
            success: true,
            message: "Deleted Successfull!",
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { loginHandler, registerHandler, updateHandler, deleteHandler }