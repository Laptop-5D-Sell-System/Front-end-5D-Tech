'use client';

import './EditInformation.scss';
import { useState } from 'react';

export default function EditInformationPage() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        dob: '',
        phone_number: '',
        address: '',
        profile_picture: null, // Lưu file ảnh
        current_password: '',
        new_password: '',
        confirm_password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({ ...prev, profile_picture: e.target.files[0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Kiểm tra mật khẩu mới và xác nhận mật khẩu
        if (formData.new_password && formData.new_password !== formData.confirm_password) {
            alert('Mật khẩu mới và xác nhận mật khẩu không khớp!');
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('first_name', formData.first_name);
            formDataToSend.append('last_name', formData.last_name);
            formDataToSend.append('dob', formData.dob);
            formDataToSend.append('phone_number', formData.phone_number);
            formDataToSend.append('address', formData.address);
            if (formData.profile_picture) {
                formDataToSend.append('profile_picture', formData.profile_picture);
            }
            formDataToSend.append('current_password', formData.current_password);
            formDataToSend.append('new_password', formData.new_password);

            const response = await fetch('/api/user/update', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Cập nhật thông tin thất bại');
            }

            alert('Cập nhật thông tin thành công!');
        } catch (error: any) {
            console.error('Error updating information:', error);
            alert(error.message || 'Đã xảy ra lỗi khi cập nhật thông tin.');
        }
    };

    return (
        <div className="edit-information-container mx-auto max-w-lg p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Chỉnh sửa thông tin cá nhân</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name */}
                <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        Họ
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        placeholder="Nhập họ"
                        required
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                        Tên
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        placeholder="Nhập tên"
                        required
                    />
                </div>

                {/* Date of Birth */}
                <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                        Ngày sinh
                    </label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        required
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                        Số điện thoại
                    </label>
                    <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        placeholder="Nhập số điện thoại"
                        required
                    />
                </div>

                {/* Address */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Địa chỉ
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        placeholder="Nhập địa chỉ"
                        required
                    />
                </div>

                {/* Profile Picture */}
                <div>
                    <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700">
                        Ảnh đại diện
                    </label>
                    <input
                        type="file"
                        id="profile_picture"
                        name="profile_picture"
                        onChange={handleFileChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        accept="image/*"
                    />
                </div>

                {/* Current Password */}
                <div>
                    <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                        Mật khẩu hiện tại
                    </label>
                    <input
                        type="password"
                        id="current_password"
                        name="current_password"
                        value={formData.current_password}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        placeholder="Nhập mật khẩu hiện tại"
                        required
                    />
                </div>

                {/* New Password */}
                <div>
                    <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
                        Mật khẩu mới
                    </label>
                    <input
                        type="password"
                        id="new_password"
                        name="new_password"
                        value={formData.new_password}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        placeholder="Nhập mật khẩu mới"
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                        Xác nhận mật khẩu mới
                    </label>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        placeholder="Xác nhận mật khẩu mới"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                >
                    Lưu thay đổi
                </button>
            </form>
        </div>
    );
}