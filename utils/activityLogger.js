const { ActivityLog } = require("../models");

const saveActivity = async (userId, activity, ipAddress) => {
    try {
        await ActivityLog.create({
            user_id: userId,
            activity,
            ip_address: ipAddress
        });
    } catch (err) {
        console.error("Activity Log Error:", err.message);
    }
};

module.exports = saveActivity;