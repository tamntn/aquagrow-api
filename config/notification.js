module.exports = {
    notificationTypes: {
        ERROR: "error",
        WARNING: "warning",
        SUCCESS: "success"
    },
    notificationAspects: {
        LIGHT: "light",
        TEMPERATURE: "temp",
        HUMIDITY: "humidity",
        WATER: "water",
        PUMP: "pump",
        pHLEVEL: "pHlevel"
    },
    notificationRepeatDifferenceInMinutes: {
        HOURLY: 60,
        DAILY: 1440,
        WEEKLY: 10080,
        BIWEEKLY: 20160,
        // MONTHLY: is a little different as each month has a different number of days
    }
}