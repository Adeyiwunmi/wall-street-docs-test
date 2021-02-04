const calculateStringSimilarity = (str1, str2) => {
    return Math.min(str1.length, str2.length) / Math.max(str1.length, str2.length);
};

module.exports = {calculateStringSimilarity};