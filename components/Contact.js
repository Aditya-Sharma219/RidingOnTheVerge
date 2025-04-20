"use client";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
    const formRef = useRef();
    const [success, setSuccess] = useState(false);
    const WEB3_KEY = process.env.WEB3FORMS_API_KEY;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        formData.set("access_key", WEB3_KEY);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        const result = await res.json();

        if (result.success) {
            toast.success("Message sent successfully &#x2705;", {
                position: "top-right",
                autoClose: 3000,
            });

            formRef.current.reset();
            setSuccess(true);
            setTimeout(() => setSuccess(false), 4000);
        } else {
            toast.error("Something went wrong. Please try again.");
            setSuccess(false);
        }
    };
    return (
        <>
            {/* Gray Divider for spacing from upper section */}
            <div className="h-20 bg-gray-300 w-full"></div>

            <section
                id="contact"
                className="relative bg-cover bg-center py-16 px-4 sm:px-6 lg:px-8"
                style={{ backgroundImage: "url('/images/contact-bg.jpg')" }}
            >
                <ToastContainer />

                {/* Form Card */}
                <div className="relative z-10 max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-lg px-6 py-10 md:px-10">
                    <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 text-center">
                        Work With Us 🚀
                    </h3>
                    <p className="text-md text-gray-700 mb-6 text-center max-w-2xl mx-auto">
                        Interested in sponsoring our rides or collaborating with us? Fill out the form
                        or reach out via{" "}
                        <a
                            href="mailto:ridingontheverge@gmail.com"
                            className="text-blue-600 underline hover:text-blue-800 transition"
                        >
                            email
                        </a>{" "}
                        or connect on{" "}
                        <a
                            href="https://instagram.com/ridingontheverge"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 underline hover:text-pink-800 transition"
                        >
                            Instagram
                        </a>.
                    </p>

                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >
                        {/* Hidden Inputs */}
                        <input type="hidden" name="access_key" value={WEB3_KEY} />
                        <input type="hidden" name="subject" value="New Collaboration Inquiry" />
                        <input type="checkbox" name="botcheck" className="hidden" />

                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-gray-800 font-semibold mb-1">
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-gray-800 font-semibold mb-1">
                                Your Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-gray-800 font-semibold mb-1">
                                Message
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                rows="5"
                                required
                                placeholder="Write your message here..."
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="mt-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            <span className="animate-pulse">🚀</span>
                            <span>Send Message</span>
                        </button>

                        {/* Success Message Animation */}
                        <AnimatePresence>
                            {success && (
                                <motion.p
                                    key="success-msg"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-green-600 text-center font-medium mt-3"
                                >
                                    ✅ Message received! We&apos;ll get back to you soon.
                                </motion.p>
                            )}
                        </AnimatePresence>

                    </form>
                </div>
            </section>
        </>
    );
};

export default Contact;
