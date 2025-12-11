interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries every 10 minutes
setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) {
            rateLimitStore.delete(ip);
        }
    }
}, 10 * 60 * 1000);

export function checkRateLimit(
    ip: string,
    maxRequests: number = 3,
    windowMs: number = 60 * 60 * 1000 // 1 hour
): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = rateLimitStore.get(ip);

    if (!entry || now > entry.resetTime) {
        // New window
        rateLimitStore.set(ip, {
            count: 1,
            resetTime: now + windowMs,
        });
        return {
            allowed: true,
            remaining: maxRequests - 1,
            resetTime: now + windowMs,
        };
    }

    if (entry.count >= maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetTime: entry.resetTime,
        };
    }

    entry.count++;
    return {
        allowed: true,
        remaining: maxRequests - entry.count,
        resetTime: entry.resetTime,
    };
}
