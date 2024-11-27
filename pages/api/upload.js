import AWS from 'aws-sdk';
import formidable from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Error parsing form data' });
    }

    const id = fields.id;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const folderName = `${id}/`;

    try {
      const uploadPromises = Object.values(files).map((file) => {
        const fileStream = fs.createReadStream(file.filepath);
        const params = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `${folderName}${uuidv4()}_${file.originalFilename}`,
          Body: fileStream,
        };
        return s3.upload(params).promise();
      });

      const uploadResults = await Promise.all(uploadPromises);
      res.status(200).json({ message: 'Files uploaded successfully', uploadResults });
    } catch (uploadError) {
      console.error(uploadError);
      res.status(500).json({ error: 'Failed to upload files' });
    }
  });
};
