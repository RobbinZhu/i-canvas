// Gradually changes a value towards a desired goal over time.
let currentVelocity

function Clamp(value, min, max) {
    if (value < min)
        value = min
    else if (value > max)
        value = max
    return value
}

function SmoothDamp(current, target, smoothTime, deltaTime, maxSpeed) {
    if (maxSpeed === undefined) {
        maxSpeed = Infinity
    }
    // Based on Game Programming Gems 4 Chapter 1.10
    smoothTime = Math.max(0.0001, smoothTime)
    const omega = 2 / smoothTime

    const x = omega * deltaTime
    const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
    const change = current - target
    const originalTo = target

    // Clamp maximum speed
    //const maxChange = maxSpeed * smoothTime
    // change = Clamp(change, -maxChange, maxChange)
    target = current - change

    const temp = (currentVelocity + omega * change) * deltaTime
    currentVelocity = (currentVelocity - omega * temp) * exp
    let output = target + (change + temp) * exp

    // Prevent overshooting
    if (originalTo - current > 0.0 == output > originalTo) {
        output = originalTo
        currentVelocity = (output - originalTo) / deltaTime
    }

    return output
}

function SmoothDampVector(current, target, currentVelocity, smoothTime, deltaTime, maxSpeed, output) {
    if (maxSpeed === undefined) {
        maxSpeed = Infinity
    }
    // Based on Game Programming Gems 4 Chapter 1.10
    smoothTime = Math.max(0.0001, smoothTime)
    const omega = 2 / smoothTime

    const x = omega * deltaTime
    const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)

    let changeX = current.x - target.x
    let changeY = current.y - target.y

    const maxChangeX = maxSpeed.x * smoothTime
    const maxChangeY = maxSpeed.y * smoothTime

    changeX = Clamp(changeX, -maxChangeX, maxChangeX)
    changeY = Clamp(changeY, -maxChangeY, maxChangeY)

    const targetX = current.x - changeX
    const targetY = current.y - changeY

    const tempX = (currentVelocity.x + omega * changeX) * deltaTime
    const tempY = (currentVelocity.y + omega * changeY) * deltaTime

    currentVelocity.x = (currentVelocity.x - omega * tempX) * exp
    currentVelocity.y = (currentVelocity.y - omega * tempY) * exp

    let outputX = targetX + (changeX + tempX) * exp
    let outputY = targetY + (changeY + tempY) * exp

    if((target.x - current.x > 0) == (output.x > target.x)) {
        outputX = target.x
        currentVelocity.x = (outputX - target.x) / deltaTime
    }

    if((target.y - current.y > 0) == (output.y > target.y)) {
        outputY = target.y
        currentVelocity.y = (outputX - target.y) / deltaTime
    }
    output.x = outputX
    output.y = outputY
    /*
    const change = current - target
    const originalTo = target

    // Clamp maximum speed
    const maxChange = maxSpeed * smoothTime
    change = Clamp(change, -maxChange, maxChange)
    target = current - change

    const temp = (currentVelocity + omega * change) * deltaTime
    currentVelocity = (currentVelocity - omega * temp) * exp
    let output = target + (change + temp) * exp

    // Prevent overshooting
    if (originalTo - current > 0.0 == output > originalTo) {
        output = originalTo
        currentVelocity = (output - originalTo) / deltaTime
    }
    
    return output
    */
}


/*
// Returns a copy of /vector/ with its magnitude clamped to /maxLength/.
public static Vector2 ClampMagnitude(Vector2 vector, float maxLength)
{
    if (vector.sqrMagnitude > maxLength * maxLength)
        return vector.normalized * maxLength;
    return vector;
}*/
/*
        // Returns a copy of /vector/ with its magnitude clamped to /maxLength/.
        function ClampMagnitude( vector,  maxLength)
        {
            if (vector.sqrMagnitude > maxLength * maxLength)
                return vector.normalized * maxLength;
            return vector
        }
        function SmoothDamp( current, target, currentVelocity, smoothTime, maxSpeed,  deltaTime)
        {
            // Based on Game Programming Gems 4 Chapter 1.10
            smoothTime = Math.max(0.0001, smoothTime)
            const omega = 2 / smoothTime

            const x = omega * deltaTime
            const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)

            const changeX = current.x - target.x
            const changeY = current.y - target.y
            const change = current.copy().substract(target)
            // Vector2 change = current - target
            const originalTo = target

            // Clamp maximum speed
            const maxChange = maxSpeed * smoothTime
            change = ClampMagnitude(change, maxChange)
            // target = current - change
            target = current.copy().substract(change)

            Vector2 temp = (currentVelocity + omega * change) * deltaTime;
            currentVelocity = (currentVelocity - omega * temp) * exp;
            Vector2 output = target + (change + temp) * exp;

            // Prevent overshooting
            if (Dot(originalTo - current, output - originalTo) > 0)
            {
                output = originalTo;
                currentVelocity = (output - originalTo) / deltaTime;
            }

            return output;
        }
        */