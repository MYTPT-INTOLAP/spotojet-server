
function getFileType(fileName) {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    if (fileExtension === 'csv') {
        return 'csv';
    } else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
        return 'excel';
    } else {
        return 'unknown';
    }
}


module.exports = { getFileType }
