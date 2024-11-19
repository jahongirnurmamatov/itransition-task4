import { User } from "../models/user.model.js";
export const getAllUsers = async (req, res) => {
  try {
    const {
      searchKey = "",
      nameOrder,
      lastLoginOrder,
      page = 1,
    } = req.query.searchKey;

    let query = {};
    if (searchKey.toString().trim()) {
      query = {
        $or: [
          { name: { $regex: new RegExp(searchKey, "i") } },
          { email: { $regex: new RegExp(searchKey, "i") } },
        ],
      };
    }

    const sort = {};
    if (nameOrder && nameOrder !== "none")
      sort.name = nameOrder === "asc" ? 1 : -1;
    if (lastLoginOrder && lastLoginOrder !== "none")
      sort.lastLogin = lastLoginOrder === "asc" ? 1 : -1;
    if (!lastLoginOrder && !nameOrder) sort.createdAt = -1;

    const users = await User.find(query)
      .sort(sort)
      .select("-password")
      .skip((page - 1) * Number(5))
      .limit(Number(5));

    const totalDocuments = await User.countDocuments(query);
    const totalPages = Math.ceil(totalDocuments / Number(5));

    res
      .status(200)
      .json({ success: true, users, pagination: { page, totalPages } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in fetching user", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const blockToggleById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newStatus = user.status === "Active" ? "Blocked" : "Active";
    user.status = newStatus;
    await user.save();

    res.status(200).json({ message: `User is ${newStatus}`, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteBy = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const blockToggleBulk = async (req, res) => {
  try {
    const { userIds, status } = req.body;
    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid or empty userIds array" });
    }
    const newStatus = status === "block" ? "Blocked" : "Active";

    const result = await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { status: newStatus } }
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "No users found with the provided IDs" });
    }
    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} users updated to ${newStatus} successfully`,
    });
  } catch (error) {
    console.error("Error updating user statuses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const bulkDeleteUsers = async (req, res) => {
  try {
    const { userIds } = req.body; // Array of user IDs to be deleted

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res
        .status(400)
        .json({ message: "No user IDs provided or invalid input" });
    }
    const result = await User.deleteMany({ _id: { $in: userIds } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No users found to delete" });
    }
    res.status(200).json({
      message: `${result.deletedCount} users deleted successfully`,
    });
  } catch (error) {
    console.error("Error in bulk soft deleting users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
