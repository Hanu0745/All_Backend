
const user = require('../models/usermodal');
user.syncIndexes();

// const AddUser = async(req, res) => {
//     const userData = req.body;
//     console.log(userData);
//     const newUser = new user(userData);
//     await newUser.save().
//     then((result) => {
//         res.status(201).json('user added');
//     }).catch((er) => {
//         res.status(500).json(er);
//     })
// }

const AddUser = async (req, res) => {
    const {userName,userRoll, userMobile, userEmail, userPassword} = req.body;
    console.log(req.body, req.files);

    // const userimg = req.files?.['userImage']?.[0]?.filename || null;
    const userimg = req.file ? req.file.filename : null;

    const userData = {
        userName: userName,
        userImage: userimg,
        userRoll: userRoll,
        userMobile: userMobile,
        userEmail: userEmail,
        userPassword: userPassword
    };

    const newUser = new user(userData);
    await newUser.save()
        .then(() => {
            res.status(201).json('User added successfully');
        })
        .catch((err) => {
            // Handle validation errors
            if (err.code === 11000) {
                res.status(400).json({ error: 'Email already exists', details: err.errors });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
};

const getUser = async(req, res) => {
    console.log('testing');
    // console.log(req.params.id);
    await user.find()
    .then((result) => {
        res.status(201).json(result)
    }).catch((er) => {
        res.status(500).json(er);
    })
}

const updateUser = async(req, res) => {
    const userId = req.params.id;
    console.log(userId);
    console.log(req.body);
    await user.findByIdAndUpdate({"_id": userId}, req.body, {new: true})
    .then((result) => {
        res.status(201).json(result);
        console.log('data updated');
    }).catch((er) => {
        res.status(500).json(er);
        console.log(er);
    })
};

const deleteUser = async(req, res) => {
    const userId = req.params.id;
    await user.findByIdAndDelete({"_id": userId})
    .then((result) => {
        res.status(201).json(result);
        console.log('user deleted')
    }).catch((er) => {
        res.status(500).json(er);
        console.log('data deleted');
    })
}

const userLogin = async(req, res) => {
    const {userEmail, userPassword} = req.body;

    const isUser = await user.findOne({userEmail});
    if(!isUser) return res.status(400).json("invalid email or pass");
    else{
        if(isUser.userPassword !== userPassword){ 
            console.log('wrong pass');
            return res.status(400).json("invalid email or pass");}
        return res.status(201).json("user login sucessfully");
    }
}

const uploadUserImage = async(req, res) => {

}


exports.AddUser = AddUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.userLogin = userLogin;
exports.uploadUserImage = uploadUserImage;
