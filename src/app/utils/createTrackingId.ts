
export const createTrackingId = () => {
    const dateString = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    return `TRK-${dateString}-${randomNumber}`
}