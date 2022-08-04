import { Router } from 'express'
const router = Router()
import { createUser, followUser,logoutUser,login,updatePassword,updateProfile,deleteAccount,userProfile,getUserProfile, updateProfilePic, searchUserProfile} from '../controllers/UserController.js'
import { isAuthenticated } from '../middleware/auth.js'


router.post("/register",createUser)

router.post("/login",login)

router.route("/logout").get(isAuthenticated,logoutUser)

router.route("/update/password").put(isAuthenticated,updatePassword)

router.route("/follow/:id").get(isAuthenticated,followUser)

router.route("/update/profile").put(isAuthenticated,updateProfile)

router.route("/update/avatar").put(isAuthenticated,updateProfilePic)

router.route("/remove").delete(isAuthenticated,deleteAccount)

router.route("/profile").get(isAuthenticated,userProfile)

router.route("/search/:id").get(isAuthenticated,getUserProfile)

router.route("/search").get(isAuthenticated,searchUserProfile)

// router.route("/allusers").get(isAuthenticated,getAllUsers)

// router.route("/forgot/password").post(forgotPassword)

// router.route("/password/reset/:token").put(resetPassword)

export default router