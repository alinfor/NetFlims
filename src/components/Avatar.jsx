import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const user = useSelector((store) => store.reducerUser);


  const supabase = createClient(
    import.meta.env.VITE_PROJECT_URL,
    import.meta.env.VITE_ANON_API_KEY
  );

  useEffect(() => {
    if (url){
      downloadImage(url)
    } 
  }, [url])

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(user.id + "/" + path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      // console.log(url);
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`
      // console.log(filePath, file)
      let { error: uploadError } = await supabase.storage.from('avatars').upload(user.id + "/" + filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="profile-avatar" aria-live="polite">
      <img
        src={avatarUrl ? avatarUrl : `https://place-hold.it/${size}x${size}`}
        alt={avatarUrl ? "Avatar" : "No image"}
        className="avatar image"
        style={{ height: size, width: size }}
      />
      {uploading ? (
        "Uploading..."
      ) : (
        <>
          <label className="profile-infos-form-button button-white" htmlFor="single">
            Modify your avatar
          </label>
          <div className="upload-file">
            <input
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
            />
          </div>
        </>
      )}
    </div>
  );
}