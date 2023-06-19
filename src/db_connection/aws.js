const AWS = require('aws-sdk');
const fs = require('fs');

// Configure AWS credentials
AWS.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'YOUR_AWS_REGION'
});

// Create an instance of the S3 service
const s3 = new AWS.S3();

// Function to upload file to S3 bucket
async function uploadFileToS3(filePath, bucketName) {
    const fileContent = fs.readFileSync(filePath);

    const params = {
        Bucket: bucketName,
        Key: filePath.split('/').pop(), // Extract the file name from the path
        Body: fileContent
    };

    try {
        await s3.upload(params).promise();
        console.log('File uploaded successfully');
    } catch (error) {
        console.log('Error uploading file:', error);
    }
}

// Function to generate access link for S3 object
function generateS3AccessLink(bucketName, fileName) {
    const params = { Bucket: bucketName, Key: fileName };
    const url = s3.getSignedUrl('getObject', params);
    return url;
}

// Usage example
const filePath = '/path/to/audio_file.mp3';



const uploadAws = async (filePath) => {
    const bucketName = 'your-s3-bucket-name';
    uploadFileToS3(filePath, bucketName)
        .then(() => {
            const fileName = filePath.split('/').pop();
            const accessLink = generateS3AccessLink(bucketName, fileName);
            console.log('Access link:', accessLink);
        })
        .catch(error => {
            console.log('Error:', error);
        });
}



module.exports = { uploadAws };