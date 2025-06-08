'use client'

import { Search } from 'lucide-react'
import React, { useState } from 'react'

const SearchQuestion = () => {
    const [search, setSearch] = useState();

    return (
        <div className="relative flex items-center gap-2 w-full rounded bg-black/30 " >
            <Search className="ml-3 text-gray-400" size={16} />
            <input
                type="text"
                placeholder="Search questions"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded w-full py-2 pr-3 text-sm placeholder-gray-400 text-white outline-none focus:outline-none "
            />
        </div>
    )
}

export default SearchQuestion