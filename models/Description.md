# Models Description

- [Models Description](#models-description)
    - [User ⏳](#user-%E2%8F%B3)
    - [System ⏳](#system-%E2%8F%B3)
    - [Sensor ⏳](#sensor-%E2%8F%B3)
    - [Portfolio](#portfolio)
    - [Zone ✅](#zone-%E2%9C%85)
    - [Plant ✅](#plant-%E2%9C%85)
    - [Fish ✅](#fish-%E2%9C%85)
    - [Notification](#notification)
    - [Reminder](#reminder)

## User ⏳
```javascript
{
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    picture: String,
    joined: Date,
    zipCode: String,
    zone: ObjectId.Zone,
    phone: String,
    system: ObjectId.System,
    portfolio: ObjectId.Portfolio,
    notifications: [ObjectId.Notification],
}
```

## System ⏳
```javascript
{
    growLight: String,
    waterPump: String,
    heatingMat: String,
    sensorData: [ObjectId.Sensor],
    user: ObjectId.User
}
```

## Sensor ⏳
```javascript
{
    timestamp: Date,
    airTemp: String,
    airHumidity: String,
    lightIntensity: String,
    waterTemp: String,
    upperWaterLevel: String,
    lowerWaterLevel: String,
    pH: String
}
```

## Portfolio
```javascript
{
    fish: ObjectId.Fish,
    plants: [ObjectId.Plant]
}
```

## Zone ✅
```javascript
{
    zone: String,
    range: String,
    zipcodes: [String]
}
```

## Plant ✅
```javascript
{
    product: String,
    product_url: String,
    main: String,
    main_url: String,
    main_pic: String,
    category: String,
    pH_range: [String],
    zones: [String],
    // more not required properties
    // look at Plant.js for details
}
```

## Fish ✅
```javascript
{
    name: String,
    type: String,
    description: String,
    feeding: String,
    diet: String,
    tempLow: Number,
    tempHigh: Number,
    harvestRange: String,
    picture: String
}
```

## Notification
```javascript
{

}
```

## Reminder
```javascript
{

}
```
