import React from 'react';
import { FaCreditCard, FaBook, FaBriefcase } from 'react-icons/fa6';

export const navItemsData = [
        {
            category: 'products',
            subItems: [
                { label: 'payment', icon: <FaCreditCard />, url: '/products' },
                { label: 'terminal', icon: <FaCreditCard />, url: '/products' },
                { label: 'connect', icon: <FaCreditCard />, url: '/products' }
            ]
        },
        {
            category: 'developers',
            subItems: [
                { label: 'plugins', icon: <FaBook />, url: '/products' },
                { label: 'libraries', icon: <FaBook />, url: '/products' },
                { label: 'help', icon: <FaBook />, url: '/products' },
                { label: 'billing', icon: <FaBook />, url: '/products' }
            ]
        },
        {
            category: 'company',
            subItems: [
                { label: 'about', icon: <FaBriefcase />, url: '/products' },
                { label: 'customers', icon: <FaBriefcase />, url: '/products' }
            ]
        }
    ]