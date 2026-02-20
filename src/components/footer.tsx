"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 md:py-20 border-t border-gray-800 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 mb-8">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden">
              <Image
                src="/images/logo.svg"
                alt="Lunive Logo"
                fill
                className="object-contain rounded-[6px]"
              />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight">
              Lunive
            </span>
          </Link>

          {/* Legal & Notice Section */}
          <div className="max-w-2xl mb-10 space-y-4">
            {/* 1. Official Platform Notice: 유사 서비스 방어용 */}
            <p className="text-[11px] sm:text-xs text-gray-400 font-medium tracking-wide uppercase">
              <span className="text-blue-500 mr-1.5">●</span>
              Official Channel Notice
            </p>
            <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
              <strong>Lunive™</strong> provides services exclusively through our
              official website and verified channels. We are not affiliated
              with, nor do we endorse, any third-party applications or websites
              of the same name currently available on external platforms. Any
              contact or service claiming to be "Lunive" outside of our official
              channels — especially in the context of dating, personal
              relationships, or financial schemes —{" "}
              <strong>is not affiliated with us in any way.</strong>
            </p>

            {/* 2. Trademark Notice */}
            <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
              The names, logos, and icons identifying <strong>Lunive™</strong>{" "}
              are proprietary marks of <strong>Lunive</strong>, filed with the
              Korean Intellectual Property Office (KIPO) under Application No.{" "}
              <strong className="font-mono tracking-wide text-gray-500">
                40-2026-0034321
              </strong>{" "}
              (Class 9 &amp; 42), currently pending registration with priority
              rights established. Unauthorized use of any trademark or service
              mark may violate applicable trademark and unfair competition laws.
              No license is granted without the express written consent of{" "}
              <strong>Lunive</strong>.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-5 mb-10">
            {[
              { icon: Github, href: "https://github.com/lunivehq" },
              { icon: Twitter, href: "https://x.com/lunivehq" },
              { icon: Linkedin, href: "https://linkedin.com" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Copyright Section */}
          <div className="pt-8 border-t border-gray-800/50 w-full max-w-xs">
            <p className="text-gray-600 text-[11px] tracking-widest uppercase">
              © 2025 - {currentYear} Lunive. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
