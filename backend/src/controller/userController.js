
let login= (req,res) => {
    res.send("<h1>login into user account</h1>")
}

let logout= (req,res) => {
    res.send("<h1>logout of user account</h1>")
}

let register= (req,res) => {
    res.send("<h1>Register has been done</h1>")
}

let profile= (req,res) => {
    res.send("<h1 style='text-align:center;color:red'>profile data</h1>")
}

let updateProfile = (req,res) =>{
    res.send("<h1>update user profile</h1>")
}

module.exports={login,logout,register,profile,updateProfile};