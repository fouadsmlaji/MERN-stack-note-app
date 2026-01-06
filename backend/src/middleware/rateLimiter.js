import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {

   try {
    const { success } = await ratelimit.limit("userid");
    if (!success) {
        return res.status(429).json({ success: false, message: "Too many requests man!" });
    }
    next();
   } catch (error) {
    res.status(500).json({ success: false, message: error.message });
   }
}

export default rateLimiter;