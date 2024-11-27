
# S3 Upload App

This is a simple application that accepts an ID and file attachments, then uploads the attachments to an AWS S3 bucket in a folder named after the ID. The application is built with Next.js and hosted on Vercel.

## Features
- Accepts ID and multiple file attachments as input.
- Creates a folder in the S3 bucket based on the ID.
- Uploads all files to the specified folder.

## Prerequisites
- AWS account with an S3 bucket.
- Node.js and npm installed on your local machine.

## Installation

1. Clone or download the project.
2. Navigate to the project directory.

   ```bash
   cd s3_upload_app
   ```

3. Install dependencies.

   ```bash
   npm install
   ```

4. Configure environment variables by updating the `.env.local` file with your AWS credentials and S3 bucket information.

   ```env
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   AWS_REGION=your_region
   AWS_S3_BUCKET_NAME=your_bucket_name
   ```

## Running Locally

1. Start the development server.

   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

1. Install the Vercel CLI if not already installed.

   ```bash
   npm install -g vercel
   ```

2. Deploy the app to Vercel.

   ```bash
   vercel
   ```

## API Endpoint

### `/api/upload`

**Method:** `POST`  
**Description:** Uploads files to the specified S3 bucket.  

**Request Body:**  
- Form data containing:
  - `id` (string): The folder name in S3.
  - File attachments: One or more files to upload.

**Response:**  
- `200`: Files uploaded successfully.
- `400`: Invalid input.
- `500`: Server error during file upload.

## Example Usage

To upload files, use tools like Postman or cURL to send a POST request to `/api/upload` with form-data containing the `id` and the files.

Example cURL command:

```bash
curl -X POST -F "id=12345" -F "file=@path/to/file1.jpg" -F "file=@path/to/file2.png" http://localhost:3000/api/upload
```

## License

This project is licensed under the MIT License.
