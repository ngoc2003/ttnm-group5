"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-4 px-6 mt-8 text-sm text-gray-600">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p>
          &copy; {new Date().getFullYear()} BFP - Quản lý sân bóng. All rights
          reserved.
        </p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-blue-600 transition">
            Chính sách
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Điều khoản
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Liên hệ
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
