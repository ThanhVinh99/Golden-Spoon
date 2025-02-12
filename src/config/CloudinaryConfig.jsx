import CryptoJS from "crypto-js"; // Thư viện để tạo chữ ký bảo mật (signature)
import { CLOUD_NAME, UPLOAD_PRESET } from "../utils/Constants";
/**
 * Hàm tải ảnh lên Cloudinary.
 * @param {File} imgFile - File ảnh cần tải lên.
 * @param {string} folderName - (Tùy chọn) Tên thư mục trên Cloudinary để lưu trữ ảnh.
 * @returns {Promise<string>} - URL của ảnh đã tải lên từ Cloudinary.
 */
export const uploadImageToCloudinary = async (imgFile, folderName) => {
  const formData = new FormData(); // Tạo đối tượng FormData để gửi dữ liệu
  formData.append("file", imgFile); // Thêm file ảnh vào formData
  formData.append("upload_preset", UPLOAD_PRESET); // Tên upload preset (đã được cấu hình trên Cloudinary)
  formData.append("cloud_name", CLOUD_NAME); // Tên cloud (thay bằng cloud_name của bạn)

  // Nếu có thư mục chỉ định, thêm thư mục vào formData
  if (folderName) {
    formData.append("folder", folderName);
  }

  try {
    // Gửi yêu cầu tải ảnh lên Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST", // Phương thức POST để tải ảnh lên
        body: formData, // Gửi dữ liệu formData
      }
    );

    const data = await response.json(); // Chuyển đổi phản hồi JSON từ Cloudinary
    return data.secure_url; // Trả về URL ảnh đã tải lên (secure URL)
  } catch (error) {
    console.error("Upload failed:", error); // Log lỗi nếu xảy ra
    throw error; // Ném lỗi để xử lý bên ngoài
  }
};

/**
 * Hàm xóa ảnh khỏi Cloudinary.
 * @param {string} publicId - ID công khai của ảnh (lấy từ Cloudinary khi tải lên).
 * @returns {Promise<Object>} - Kết quả của thao tác xóa từ Cloudinary.
 */
export const deleteImageFromCloudinary = async (publicId) => {
  // Tạo timestamp hiện tại
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Các thông tin cần thiết để xác thực
  const apiKey = "957659142363954"; // API key (thay bằng API key của bạn)
  const apiSecret = "QXAJjoLAv8THFUqsQAVW1OgJGDk"; // API secret (thay bằng API secret của bạn)
  const cloudName = "dymypfkt4"; // Tên cloud (thay bằng cloud_name của bạn)

  // Tạo signature bảo mật để xác thực yêu cầu
  const signature = CryptoJS.SHA1(
    `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
  ).toString();

  const formData = new FormData(); // Tạo đối tượng FormData để gửi dữ liệu
  formData.append("public_id", publicId); // Thêm publicId của ảnh cần xóa
  formData.append("timestamp", timestamp); // Thêm timestamp
  formData.append("api_key", apiKey); // Thêm API key
  formData.append("signature", signature); // Thêm chữ ký bảo mật

  try {
    // Gửi yêu cầu xóa ảnh lên Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        method: "POST", // Phương thức POST để xóa ảnh
        body: formData, // Gửi dữ liệu formData
      }
    );

    const result = await response.json(); // Chuyển đổi phản hồi JSON từ Cloudinary
    return result; // Trả về kết quả xóa ảnh (success/failure)
  } catch (error) {
    console.error("Delete failed:", error); // Log lỗi nếu xảy ra
    throw error; // Ném lỗi để xử lý bên ngoài
  }
};
