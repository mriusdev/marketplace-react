export const publicS3Url = (s3ObjectPath: string): string => {
  return `${import.meta.env.VITE_AWS_BUCKET_URL}${s3ObjectPath}`
}