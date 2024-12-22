import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center flex-wrap">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold">About Us</h2>
                        <ul className="mt-2 space-y-2">
                            <li>Team</li>
                            <li>Company</li>
                            <li>Careers</li>
                        </ul>
                    </div>
                    <div className="p-4">
                        <h2 className="text-lg font-semibold">Contact Us</h2>
                        <ul className="mt-2 space-y-2">
                            <li>Email: info@example.com</li>
                            <li>Phone: (123) 456-7890</li>
                            <li>Support: support@example.com</li>
                        </ul>
                    </div>
                    <div className="p-4">
                        <h2 className="text-lg font-semibold">Follow Us</h2>
                        <ul className="flex mt-2 space-x-4">
                            <li><a href="#" className="hover:text-gray-400">Twitter</a></li>
                            <li><a href="#" className="hover:text-gray-400">Facebook</a></li>
                            <li><a href="#" className="hover:text-gray-400">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-gray-400 mt-4">
                    © {new Date().getFullYear()} Your Company Name. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
