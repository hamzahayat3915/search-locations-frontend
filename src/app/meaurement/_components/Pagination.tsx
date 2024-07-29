'use client'

import { useState } from "react";

const Pagination = (props: any) => {

    const handleClick = (pageNumber: number) => {
        props.setCurrentPage(pageNumber)
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                className={`px-4 py-2 mx-1 border ${props.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleClick(props.currentPage - 1)}
                disabled={props.currentPage === 1}
            >
                Previous
            </button>
            {Array.from({ length: props.totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    className={`px-4 py-2 mx-1 border ${props.currentPage === index + 1 ? 'bg-gray-300' : ''}`}
                    onClick={() => handleClick(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
            <button
                className={`px-4 py-2 mx-1 border ${props.currentPage === props.totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleClick(props.currentPage + 1)}
                disabled={props.currentPage === props.totalPages}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination