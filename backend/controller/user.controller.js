import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const { searchKey, nameOrder, emailOrder, lastLoginOrder, status } =
      req.query;

    const query = {};
    if (searchKey) {
      query.$or = [
        { name: { $regex: searchKey, $options: "i" } },
        { email: { $regex: searchKey, $options: "i" } },
      ];
    }
    if (status) {
      query.status = status;
    }

    const sort = {};
    if (nameOrder) {
      sort.name = nameOrder === "asc" ? 1 : -1;
    }
    if (emailOrder) {
      sort.email = emailOrder === "asc" ? 1 : -1;
    }
    if (lastLoginOrder) {
      sort.lastLogin = lastLoginOrder === "asc" ? 1 : -1;
    }

    if (!nameOrder && !emailOrder && !lastLoginOrder) {
      sort.createdAt = -1;
    }

    const users = await User.find(query).sort(sort).select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
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
