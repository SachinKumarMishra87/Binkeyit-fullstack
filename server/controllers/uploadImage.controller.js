import uploadImageCloudanary from "../utils/uploadImageCloudinary.js"

const uploadImageController = async(request, response) => {
    try {
        const file = request.file;

        const uploadImage = await uploadImageCloudanary(file)
        return response.json({
            message : "upload successfully",
            data : uploadImage,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export default uploadImageController;