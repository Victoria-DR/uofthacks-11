import React from 'react'

const UploadImage = () => {
    const [imageBase64, setImageBase64] = React.useState(null)
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
    const handleFileRead = async (event) => {
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
        setImageBase64(base64)
    }

    React.useEffect(() => {
        console.log(imageBase64)
    }, [imageBase64])

  return (
    <div>
        <input onChange={handleFileRead} type="file" />
    </div>
  )
}

export default UploadImage