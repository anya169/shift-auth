export const PHONE_FORMAT = {
    DISPLAY_START: 1,
    DISPLAY_END: 19,
    MIN_LENGTH: 16,
} as const;

export const formatPhoneForDisplay = (phone: string): string => {
    if (!phone) return '';
    return phone.slice(PHONE_FORMAT.DISPLAY_START, PHONE_FORMAT.DISPLAY_END);
};