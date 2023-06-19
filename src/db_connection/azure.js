const { BlobServiceClient } = require("@azure/storage-blob");

// Function to upload an MP3 file to Azure Blob Storage
async function uploadFileToAzureStorage(filePath, containerName, blobName) {
  const connectionString = "your-storage-connection-string";

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadFile(filePath);

  console.log(`File "${blobName}" uploaded to Azure Blob Storage.`);
}

// Function to generate a shared access signature (SAS) URL for the MP3 file
function generateSasUrlForFile(containerName, blobName) {
  const connectionString = "your-storage-connection-string";
  
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(blobName);

  const sasToken = blobClient.generateSasUrl({
    permissions: "r",
    expiresOn: new Date(new Date().valueOf() + 86400),
  });

  const sasUrl = `${blobClient.url}?${sasToken}`;

  return sasUrl;
}

module.exports = {
  uploadFileToAzureStorage,
  generateSasUrlForFile,
};
